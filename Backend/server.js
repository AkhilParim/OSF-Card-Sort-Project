// @ts-nocheck
const express = require("express");
const app = express();
const mongoose = require('mongoose');

const Card = require('./models/card');
const Participation = require('./models/participation');
const idCounter = require("./models/idCounter");

let dbEndPoint = '';
if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
//    console.log('production');
    dbEndPoint = String(process.env.DB_END_POINT);
} else {
//    console.log('dev');
    dbEndPoint = 'mongodb://127.0.0.1:27017/OSFCardSort';  // mongo shell for development
}

mongoose.connect(dbEndPoint);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
// db.once('open', () => console.log('Connected to Database'));

app.use(express.json());  // allows the server to accept json

var allowCrossDomain = function(req, res, next) {  // allows angular to connect to other ports
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
}
app.use(allowCrossDomain);

const getUpdatedId = async (collection) => {
    let seqId;
    await idCounter.findOneAndUpdate(
        {_id: collection},
        {"$inc": {"seq": 1}},
        {new: true}
    ).then(function (model) {
        if(model == null) {
            const counter = new idCounter({
                _id: collection,
                seq: 1
            });
            counter.save();
            seqId = 1;
        }
        else {
            seqId = model.seq;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    return seqId;
}

app.get('/', async (req, res) => {
    const cards = await Card.find();
    try {
        res.json(cards[0].data);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

app.post('/saveParticipation/', async(req, res) => {
    const participation = await Participation.findOneAndUpdate(
        { participationId: req.body.participationId },
        {
            placedCards: req.body.placedCards,
            discardedCards: req.body.discardedCards,
            orderOfPlacedCards: req.body.orderOfPlacedCards,
            sessionEnd: new Date().getTime()
        },
        { new: true }
    );

    const newParticipation = await participation.save();
    try {
        res.status(201).json(newParticipation);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/createParticipation/', async(req, res) => {
    let newId = await getUpdatedId('participationId');
    const participation = new Participation({
        participationId: newId,
        placedCards: null,
        discardedCards: null,
        orderOfCardsPlaced: null,
        sessionStart: new Date().getTime(),
        sessionEnd: null
    });

    const newParticipation = await participation.save();
    try {
        res.status(201).json(newParticipation);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/participations/', async (req, res) => {
    const participations = await Participation.find();
    try {
        res.json(participations);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(3000, () => {
//    console.log('Server Started');
});