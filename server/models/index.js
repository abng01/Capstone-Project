"use strict"

const User = require('./user')
const Champion = require('./champion')
const Ability = require('./ability')
const List = require('./list')
const Note = require('./note')
const { Sequelize } = require("../dbConnect")

// User > Lists
User.hasMany(List, { foreignKey: "user_id", onDelete: "CASCADE" })
List.belongsTo(User, { foreignKey: "user_id" })

// List > Champion (many-to-many)
List.belongsToMany(Champion, { through: "ListChampions", foreignKey: "list_id" })
Champion.belongsToMany(List, { through: "ListChampions", foreignKey: "champion_id" })

// Champion > Ability (one-to-many)
Champion.hasMany(Ability, { foreignKey: "champion_id", onDelete: "CASCADE" })
Ability.belongsTo(Champion, { foreignKey: "champion_id" })

// List > Note (one-to-many)
List.hasMany(Note, { foreignKey: "list_id", onDelete: "CASCADE" })
Note.belongsTo(List, { foreignKey: "list_id" })

// Champion > Note (one-to-many)
Champion.hasMany(Note, { foreignKey: "champion_id", onDelete: "CASCADE" })
Note.belongsTo(Champion, { foreignKey: "champion_id" })

async function init() {
    await User.sync()
    await Champion.sync()
    await Ability.sync()
    await List.sync()
    await Note.sync()

    await Sequelize.sync({ alter: true })
}

init()

module.exports = {
    User,
    Champion,
    Ability,
    List,
    Note
}