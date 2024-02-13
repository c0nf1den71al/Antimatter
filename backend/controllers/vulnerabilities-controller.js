const Vulnerability = require('../models/Vulnerability')
const { createLog } = require('../lib/utils')

module.exports.getVulnerabilities = async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.find({})
        return res.json(vulnerabilities)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }   
}

module.exports.createVulnerability = async (req, res) => {
    try {
        const { vulnerabilityIdentifier=undefined, title=undefined } = req.body;
        if (!title || !vulnerabilityIdentifier) return res.json({error: "'vulnerabilityIdentifier' and 'title' are required."})
        const client = await Vulnerability.create({
            vulnerabilityIdentifier,
            title
        })
        createLog("info", `The vulnerability "${vulnerabilityIdentifier}" was created successfully`)
        return res.json(client)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }
}

module.exports.deleteVulnerability = async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findByIdAndDelete(req.params.vulnerabilityId, {new: true})
        createLog("info", `The vulnerability "${vulnerabilities.vulnerabilityIdentifier}" was deleted successfully`)
        return res.json(vulnerabilities)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }
}