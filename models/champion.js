const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class Champion extends Model {}

Champion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lore: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ally_tips: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enemy_tips: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "champions",
        freezeTableName: true
    }
)

module.exports = Champion