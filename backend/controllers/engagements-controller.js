const Engagement = require('../models/Engagement')

module.exports.getEngagements = async (req, res) => {
    try {
        if(req.query.showClientName) {
            const engagements = await Engagement.aggregate([{
                "$lookup":
                {
                    "from": "clients",
                    "localField": "client",
                    "foreignField": "_id",
                    "as": "clientData"
                }
            },
            {
                $set: {
                    clientLongName: { $arrayElemAt: ["$clientData.longName", 0] },
                    clientShortName: { $arrayElemAt: ["$clientData.shortName", 0] }
                }
            }, 
            {
                $unset: "clientData" 
            }
            ])
            return res.json(engagements)
        } else {
            const engagements = await Engagement.find({})
            return res.json(engagements)
        }

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