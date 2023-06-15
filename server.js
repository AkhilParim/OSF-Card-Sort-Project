const express = require("express");
const app = express();
const mongoose = require('mongoose');

const Card = require('./models/card');

mongoose.connect('mongodb://127.0.0.1:27017/OSFCardSort');
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());  // allows the server to accept json

var allowCrossDomain = function(req, res, next) {  // allows angular to connect to 3000 port
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards[0].data);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

app.listen(3000, () => {
    console.log('Server Started');
});