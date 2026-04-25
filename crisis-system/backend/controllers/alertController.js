const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
    try {
        const alert = new Alert(req.body);
        await alert.save();
        res.json({ message: "Alert Created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
