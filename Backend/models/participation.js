const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    placedCards: mongoose.Schema.Types.Mixed,
    discardedCards: [String],
    participationId: Number,
    sessionStart: Number,
    sessionEnd: Number,
    orderOfPlacedCards: [String]
});

module.exports = mongoose.model('Participation', participationSchema);