
const Cart=require('./cart');
const db=require('../util/database');

const { json } = require('body-parser');

module.exports = class {
    constructor(id,title, price, imageUrl, description) {
        this.id=id;
        this.title = title;
        this.price = Number(price);
        this.imageUrl = imageUrl;
        this.description = description;

    }


    save() {
        // Execute the INSERT query with parameters using the connection pool
        return db('INSERT INTO products (title, price, describtion, imageUrl) VALUES (?, ?, ?, ?)', [
            this.title,
            this.price,
            this.description,
            this.imageUrl
        ]);
    }
    static fetch() {
  
        return db('Select *from products')

    }
    static FindById(id) {
        return db('SELECT * FROM products WHERE id =?',id);
    }

};
