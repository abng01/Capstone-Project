const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class List extends Model {}

List.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true            
        },
        archive_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'archives',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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