const express = require("express");
const app = express();
const mongoose = require('mongoose');

const Card = require('./models/card');
const Participation = require('./models/participation');

// mongoose.connect('mongodb://127.0.0.1:27017/OSFCardSort');
mongoose.connect('mongodb+srv://root:root@atlascluster.im1sbt0.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());  // allows the server to accept json

var allowCrossDomain = function(req, res, next) {  // allows angular to connect to other ports
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
}
app.use(allowCrossDomain);

app.get('/', async (req, res) => {
    const cards = await Card.find();
    try {
        res.json(cards[0].data);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

app.post('/', async(req, res) => {
    const participation = new Participation({
        placedCards: req.body.placedCards,
        discardedCards: req.body.discardedCards
    });
    const newParticipation = await participation.save();
    try {
        res.status(201).json(newParticipation);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(443, () => {
    console.log('Server Started');
});