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
        const { vulnerabilityCode=undefined, title=undefined } = req.body;
        if (!title || !vulnerabilityCode) return res.json({error: "'vulnerabilityCode' and 'title' are required."})
        const client = await Vulnerability.create({
            vulnerabilityCode,
            title
        })
        return res.json(client)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}