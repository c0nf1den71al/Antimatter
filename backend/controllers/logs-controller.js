const Log = require("../models/Log")

module.exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find({}).sort({"timestamp": -1})
        return res.json(logs)
    } catch (error) {
        return res.json(error)
    }

}
