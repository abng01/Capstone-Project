"use strict"

const User = require('./user')
const Champion = require('./champion')
const Ability = require('./ability')
const Archive = require('./archive')
const List = require('./list')

User.hasMany(Archive, { foreignKey: "user_id", onDelete: "CASCADE" })
Archive.belongsTo(User, { foreignKey: "user_id" })

Archive.hasMany(List, { foreignKey: "archive_id", onDelete: "CASCADE" })
List.belongsTo(Archive, { foreignKey: "archive_id" })

Archive.belongsToMany(Champion, { through: "Lists", foreignKey: "archive_id", otherKey: "champion_id" })
Champion.belongsToMany(Archive, {  through: "Lists", foreignKey: "champion_id", otherKey: "archive_id" })

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