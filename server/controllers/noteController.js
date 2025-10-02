'use strict'

const Models = require("../models")

const getNotes = async (req, res) => {
    try {
        const notes = await Models.Note.findAll({
            include: [{
                model: Models.List,
                where: { user_id: req.session.user_id }
            }]
        })

        res.json({ result: 200, data: notes })
    } catch (err) {
        console.error(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

const createNote = async (req, res) => {
    try {
        const { list_id, champion_id, notes } = req.body

        // Making sure list belongs to user
        const list = await Models.List.findByPk(list_id)
        if (!list || list.user_id !== req.session.user_id) {
            return res.status(403).json({ message: "Cannot add note to this list" })
        }

        const newNote = await Models.Note.create({
            list_id,
            champion_id,
            notes
        })

        res.json({ result: 200, data: newNote })
    } catch (err) {
        console.error(err);
        res.status(500).json({ result: 500, error: err.message })
    }
}

const updateNote = async (req, res) => {
    try {
        const note = await Models.Note.findByPk(req.params.id, {
            include: Models.List
        })

        if (!note) return res.status(404).json({ message: "Note not found" })
        await note.update(req.body)

        res.json({ result: 200, data: note })
    } catch (err) {
        console.error(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Models.Note.findByPk(req.params.id, {
            include: Models.List
        })

        if (!note) return res.status(404).json({ message: "Note not found" })
        await note.destroy()

        res.json({ result: 200, message: "Note deleted" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ result: 500, error: err.message })
    }
}

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
}