'use strict'

const Models = require("../models")

const getLists = (res) => {
    Models.List.findAll({})
        .then((data) =>  {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

const createList = (data, res) => {
    Models.List.create(data)
        .then((data) => {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

const updateList = (req, res) => {
    Models.List.update(req.body, {
        where: { id: req.params.id },
        returning: true
    })
        .then((data) => {
            res.send({ result: 200, data: data})
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message})
        })
}

const deleteList = (req, res) => {
    Models.List.destroy({ where: { id: req.params.id }})
        .then((data) => {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    getLists,
    createList,
    updateList,
    deleteList
}