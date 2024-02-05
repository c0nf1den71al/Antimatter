const Client = require('../models/Client')

module.exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find({})
        return res.json(clients)
    } catch (e) {
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
        return res.json(client)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}