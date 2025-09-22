const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/", (req, res) => {
    Controllers.championController.getChampions(res)
})

module.exports = router