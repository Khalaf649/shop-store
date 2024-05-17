const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const order=sequelize.define('order',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    }
})
module.exports=order;