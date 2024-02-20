const Engagement = require('../models/Engagement')
const { createLog } = require('../lib/utils')

module.exports.getEngagements = async (req, res) => {
    try {
        if (req.query.showClientName) {
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
        createLog("error", e)
        return res.json({ error: "An error occured" }).status(500)
    }
}

module.exports.createEngagement = async (req, res) => {
    try {
        const { engagementIdentifier = undefined, client = undefined } = req.body;
        if (!engagementIdentifier || !client) return res.json({ error: "'engagementIdentifier' and 'client' are required." })
        const engagement = await Engagement.create({
            engagementIdentifier,
            client,
            executiveSummary: "[]"
        })
        createLog("info", `The engagement "${engagementIdentifier}" was created successfully`)
        return res.json(engagement)
    } catch (e) {
        createLog("error", e)
        return res.json({ error: "An error occured" }).status(500)
    }
}

module.exports.deleteEngagement = async (req, res) => {
    try {
        const engagements = await Engagement.findByIdAndDelete(req.params.engagementId, { new: true })
        createLog("info", `The client "${engagements.engagementIdentifier}" was deleted successfully`)
        return res.json(engagements)
    } catch (e) {
        createLog("error", e)
        return res.json({ error: "An error occured" }).status(500)
    }
}


module.exports.updateEngagement = async (req, res) => {
    try {
        let { engagementIdentifier = undefined, client = undefined, startDate = undefined, endDate = undefined, consultants = undefined, template = undefined, scope = undefined, status = undefined, executiveSummary = undefined } = req.body;

        if(executiveSummary) executiveSummary = JSON.stringify(executiveSummary)
        const updateObject = Object.assign(
            {},
            ...Object.entries({ engagementIdentifier, client, startDate, endDate, consultants, template, scope, status, executiveSummary })
                .filter(([key, value]) => value !== undefined)
                .map(([key, value]) => ({ [key]: value }))
        );

        if (Object.keys(updateObject).length > 0) {
            const engagement = await Engagement.findByIdAndUpdate(req.params.engagementId, updateObject, { new: true });
            createLog("info", `The engagement "${engagementIdentifier}" was updated successfully`)
            res.json(engagement)
        } else {
            return res.json({ error: "Please specify a field to update" })
        }

    } catch (e) {
        console.log(e)
        return res.json({ error: "An error occured" }).status(500)
    }
}