module.exports.stripTrailingSlash = (str) => {
    return str.endsWith('/') ?
        str.slice(0, -1) :
        str;
};


const Log = require("../models/Log")

module.exports.createLog = async (type="info", message) => {
    try {
        await Log.create({type: type, message: message})
    } catch (error) {
        throw new Error(error)
    }
}