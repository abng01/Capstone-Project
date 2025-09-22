const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class Ability extends Model {}

Ability.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        champion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'champions',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("Q", "W", "E", "R", "Passive"),
            allowNull: false
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "abilities",
        freezeTableName: true
    }
)

module.exports = Ability