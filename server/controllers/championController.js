'use strict'

const Models = require("../models")

const getChampions = (res) => {
    Models.Champion.findAll({})
        .then((data) =>  {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    getChampions
}