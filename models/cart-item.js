const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Cartitems=sequelize.define('Cartitems',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    quantity:{
      type:Sequelize.INTEGER
    }
})
module.exports=Cartitems;