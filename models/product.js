const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING, // Changed type to STRING
        allowNull: false
    },
    description: { // Corrected spelling to "description"
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;
