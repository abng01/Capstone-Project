'use strict'

const Models = require("../models")

const getUsers = (res) => {
    Models.User.findAll({})
        .then((data) =>  {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

const getUserById = (req, res) => {
    const { id } = req.params

    Models.User.findByPk(id)
        .then((user) =>  {
            if (!user) {
                return res.status(400).json({ message: "User not found" })
            }
            res.send({ result: 200, data: user })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}


const updateUser = (req, res) => {
    Models.User.update(req.body, {
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

const deleteUser = (req, res) => {
    Models.User.destroy({ where: { id: req.params.id }})
        .then((data) => {
            res.send({ result: 200, data: data })
        })
        .catch((err) => {
            console.log(err)
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}