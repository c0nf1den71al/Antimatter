const Engagement = require('../models/Engagement')

module.exports.getEngagements = async (req, res) => {
    try {
        const engagements = await Engagement.find({})
        return res.json({engagements})
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }   
}

module.exports.createEngagement = async (req, res) => {
    try {
        const { engagementCode=undefined, client=undefined } = req.body;
        if (!engagementCode || !client) return res.json({error: "'engagementCode' and 'client' are required."})
        const engagement = await Engagement.create({
            engagementCode,
            client
        })
        res.json(engagement)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}