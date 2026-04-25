const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
    type: String,
    severity: String,
    status: { type: String, default: 'ACTIVE' },
    location: String,
    lat: Number,
    lng: Number,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Alert", alertSchema);
