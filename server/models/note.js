const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class Note extends Model {}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'lists',
                key: 'id'
            }
        },
        champion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'champions',
                key: 'id'
            }
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "notes",
        timestamps: true,
        freezeTableName: true
    }
)

module.exports = Note