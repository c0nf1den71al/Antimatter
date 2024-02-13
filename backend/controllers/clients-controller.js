const Client = require('../models/Client')
const { createLog } = require('../lib/utils')

module.exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find({})
        return res.json(clients)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }   
}

module.exports.createClient = async (req, res) => {
    try {
        const { clientIdentifier=undefined, longName=undefined, shortName=undefined, contact=undefined} = req.body;
        if (!clientIdentifier || !longName || !contact?.fullName || !contact?.email) return res.json({error: "'clientIdentifier', 'longName', 'contact.fullName' and 'contact.email' are required."})
        const client = await Client.create({
            clientIdentifier,
            longName,
            shortName,
            contact
        })
        createLog("info", `The client "${clientIdentifier}" was created successfully`)
        return res.json(client)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }
}

module.exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.clientId, {new: true})
        createLog("info", `The client "${client.clientIdentifier}" was deleted successfully`)
        return res.json(client)
    } catch (e) {
        createLog("error", e)
        return res.json({error: "An error occured"}).status(500)
    }
}