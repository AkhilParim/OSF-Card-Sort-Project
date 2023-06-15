const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
    placedCards: mongoose.Schema.Types.Mixed,
    discardedCards: [String]
});

module.exports = mongoose.model('Participation', participationSchema);