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
        const { longName=undefined, shortName=undefined, contact=undefined} = req.body;
        if (!longName || !contact?.fullName || !contact?.email) return res.json({error: "'longName', 'contact.fullName' and 'contact.email' are required."})
        const client = await Client.create({
            longName,
            shortName,
            contact
        })
        return res.json(client)
    } catch (e) {
        return res.json({error: "An error occured"}).status(500)
    }
}