const sequelize = require('../database')
const {DataTypes, Model} = require('sequelize')

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
},{
    sequelize,
    modelName: 'User',
    tableName: 'users'
})

module.exports = User