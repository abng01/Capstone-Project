const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/user", Controllers.listController.getLists)

router.post("/create", Controllers.listController.createList)

router.get('/:id', Controllers.listController.getListById)

router.put("/:id", (req, res) => {
    Controllers.listController.updateList(req, res)
})

router.delete("/:id", (req, res) => {
    Controllers.listController.deleteList(req, res)
})

router.post("/:id/champions", (req, res) => {
    Controllers.listController.addChampionToList(req, res)
})

router.delete("/:listId/champions", (req, res) => {
    Controllers.listController.removeChampionFromList(req, res)
})


module.exports = router