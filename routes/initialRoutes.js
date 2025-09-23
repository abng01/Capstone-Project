const express = require("express")
const router = express.Router()
const Controllers = require("../controllers")

Controllers.initialController.storeData()

module.exports = router