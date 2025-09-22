const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/", (req, res) => {
    Controllers.archiveController.getArchives(res)
})

router.post("/create", (req, res) => {
    Controllers.archiveController.createArchive(req.body, res)
})

router.put("/:id", (req, res) => {
    Controllers.archiveController.updateArchive(req, res)
})

router.delete("/:id", (req, res) => {
    Controllers.archiveController.deleteArchive(req, res)
})

module.exports = router