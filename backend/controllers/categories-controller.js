const Category = require("../models/Category")
const { createLog } = require('../lib/utils')

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
        return res.json(categories)
    } catch (error) {
        createLog("error", error)
        return res.json(error)
    }
}

module.exports.createCategory = async (req, res) => {
    try {
        const { name = undefined } = req.body;
        if (!name) return res.json({ error: "'name' is required." })
        const category = await Category.create({
            name
        })
        createLog("info", `The category "${name}" was created successfully`)
        return res.json(category)
    } catch(error) {
        createLog("error", error)
        return res.json(error)
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const categories = await Category.findByIdAndDelete(req.params.categoryId, { new: true })
        createLog("info", `The category "${category.name}" was deleted successfully`)
        return res.json(categories)
    } catch (e) {
        createLog("error", e)
        return res.json({ error: "An error occured" }).status(500)
    }
}