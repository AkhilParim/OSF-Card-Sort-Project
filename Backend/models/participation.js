const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    UserId: String,
    placedCards: mongoose.Schema.Types.Mixed,
    discardedCards: [String],
    orderOfPlacedCards: [String],
    sessionStart: Number,
    sessionEnd: Number,
});

module.exports = mongoose.model('Participation', participationSchema);