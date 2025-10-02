const { DataTypes, Model } = require("sequelize")

let dbConnect = require("../dbConnect")

const sequelizeInstance = dbConnect.Sequelize

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "users",
        timestamps: true,
        freezeTableName: true
    }
)

module.exports = User