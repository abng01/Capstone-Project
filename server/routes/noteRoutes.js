const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/", Controllers.noteController.getNotes)

router.post("/create", Controllers.noteController.createNote)

router.put("/:id", (req, res) => {
    Controllers.noteController.updateNote(req, res)
})

router.delete("/:id", (req, res) => {
    Controllers.noteController.deleteNote(req, res)
})

module.exports = router