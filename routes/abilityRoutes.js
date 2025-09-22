const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

router.get("/", (req, res) => {
    Controllers.abilityController.getAbilities(res)
})

module.exports = router