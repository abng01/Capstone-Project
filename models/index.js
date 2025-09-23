"use strict"

const User = require('./user')
const Champion = require('./champion')
const Ability = require('./ability')
const Archive = require('./archive')
const List = require('./list')

// User ↔ Archive
User.hasMany(Archive, { foreignKey: "user_id", onDelete: "CASCADE" })
Archive.belongsTo(User, { foreignKey: "user_id" })

// Archive ↔ List
Archive.hasMany(List, { foreignKey: "archive_id", onDelete: "CASCADE" })
List.belongsTo(Archive, { foreignKey: "archive_id" })

// List ↔ Champion (many-to-many)
List.belongsToMany(Champion, { through: "ListChampions", foreignKey: "list_id" })
Champion.belongsToMany(List, { through: "ListChampions", foreignKey: "champion_id" })

// Champion ↔ Ability
Champion.hasMany(Ability, { foreignKey: "champion_id", onDelete: "CASCADE" })
Ability.belongsTo(Champion, { foreignKey: "champion_id" })

async function init() {
    await User.sync(),
    await Champion.sync(),
    await Ability.sync(),
    await Archive.sync(),
    await List.sync()
}

init()

module.exports = {
    User,
    Champion,
    Ability,
    Archive,
    List
}