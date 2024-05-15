const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const CartItem=sequelize.define('cart-item',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    }
    ,quantity:{
        type: Sequelize.INTEGER,
    }
})
module.exports=CartItem;