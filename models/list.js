const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class List extends Model {}

List.init(
    {
        archive_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'archives',
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
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "lists",
        timestamps: true,
        freezeTableName: true
    }
)

module.exports = List