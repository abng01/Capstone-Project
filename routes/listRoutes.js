const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/", (req, res) => {
    Controllers.listController.getLists(res)
})

router.post("/create", (req, res) => {
    Controllers.listController.createList(req.body, res)
})

router.put("/:id", (req, res) => {
    Controllers.listController.updateList(req, res)
})

router.delete("/:id", (req, res) => {
    Controllers.listController.deleteList(req, res)
})

module.exports = router