const mongoose = require('mongoose');

var IDCounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

module.exports = mongoose.model('IDCounter', IDCounterSchema);
