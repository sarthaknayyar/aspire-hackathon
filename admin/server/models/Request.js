const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    percentageCompletion: { type: Number, default: 0 },
    department: { type: String, required: true },
    dateSubmitted: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Request', RequestSchema);
