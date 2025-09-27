'use strict'

const Models = require("../models")

const getLists = async (req, res) => {
    try {
        const lists = await Models.List.findAll({
            where: { user_id: req.session.userId },
            include: [Models.Champion]
        })

        res.json({ result: 200, data: lists })
    } catch (err) {
        console.log("Session object:", req.session);
        console.log("Session userId:", req.session.userId);
        res.status(500).json({ result: 500, error: err.message })
    }
}

const createList = async (req, res) => {
    try {
        // Creating list based on logged in user
        const newList = await Models.List.create({
            user_id: req.session.userId,
            name: req.body.name
        })
        
        res.json({ result: 200, data: newList })
    } catch (err) {
        console.error(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

const updateList = async (req, res) => {
    try {
        // Find the list and include user info
        const list = await Models.List.findByPk(req.params.id)
        if (!list) return res.status(404).json({ message: "List not found" })

        // Check ownership
        if (list.user_id !== userId) {
            return res.status(403).json({ message: "Unauthorized: Cannot update this list" })
        }

        await list.update(req.body)

        res.json({ result: 200, data: list })
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message })
    }
};


const deleteList = async (req, res) => {
    try {
        const list = await Models.List.findByPk(req.params.id)
        if (!list) return res.status(404).json({ message: "List not found" })

        // Check ownership
        if (list.user_id !== userId) {
            return res.status(403).json({ message: "Unauthorized: Cannot delete this list" })
        }

        await list.destroy()

        res.json({ result: 200, message: "List deleted successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}


const addChampionToList = async (req, res) => {
    try {
        const listId = parseInt(req.params.id)
        const { champion_id } = req.body

        // Fetch the list
        const list = await Models.List.findByPk(listId)
        if (!list) return res.status(404).json({ result: 404, message: "List not found" })

        // Add champion using Sequelize many-to-many helper
        await list.addChampion(champion_id)

        res.json({ result: 200, message: "Champion added to list" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

const removeChampionFromList = async (req, res) => {
    try {
        const listId = parseInt(req.params.listId)
        const { champion_id } = req.body

        const list = await Models.List.findByPk(listId)
        if (!list) return res.status(404).json({ message: "List not found" })

        await list.removeChampion(champion_id)

        res.json({ result: 200, message: "Champion removed from list" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

module.exports = {
    getLists,
    createList,
    updateList,
    deleteList,
    addChampionToList,
    removeChampionFromList
}