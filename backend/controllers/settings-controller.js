const Setting = require("../models/Setting")
const { createLog } = require('../lib/utils')

module.exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.find({})
        return res.json(settings)
    } catch (error) {
        createLog("error", error)
        return res.json(error)
    }
}

module.exports.updateSetting = async (req, res) => {
    try {
        let { name, value } = req.body;
        if(name) {
            if (!value) return res.json({error: "Please specify a setting value"})
            const setting = await Setting.findOneAndUpdate({name: name}, {value: value}, { new: true });
            createLog("info", `The setting "${name}" was updated successfully`)
            res.json(setting)
        } else {
            return res.json({ error: "Please specify a setting 'name' to update" })
        }

    } catch (e) {
        console.log(e)
        return res.json({ error: "An error occured" }).status(500)
    }
}