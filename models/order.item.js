const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const orderlist=sequelize.define('orderlist',{
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
module.exports=orderlist;