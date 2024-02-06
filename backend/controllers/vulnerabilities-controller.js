const Vulnerability = require('../models/Vulnerability')

module.exports.getVulnerabilities = async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.find({})
        return res.json(vulnerabilities)
    } catch (e) {
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
        return res.json(client)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}

module.exports.deleteVulnerability = async (req, res) => {
    try {
        const vulnerabilities = await Vulnerability.findByIdAndDelete(req.params.vulnerabilityId, {new: true})
        return res.json(vulnerabilities)
    } catch (e) {
        console.log(e)
        return res.json({error: "An error occured"}).status(500)
    }
}