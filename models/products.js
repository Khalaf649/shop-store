const path = require('path');
const fs = require('fs');
const maindir = require('../util/path');
let p = path.join(maindir, 'data', 'products.json');

const { json } = require('body-parser');
const getProductfromfile = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err)
            cb([]);
        else
            cb(JSON.parse(data));
    })
}
module.exports = class {
    constructor(title, price, imageUrl, description) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;

    }


    save() {
        this.id = Math.random().toString();

        fs.readFile(p, (err, data) => {
            let arr = [];
            if (!err) {
                arr = JSON.parse(data);
            }
            arr.push(this);
            fs.writeFile(p, JSON.stringify(arr), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }
    static fetch(cb) {
        getProductfromfile(cb);


    }
    static FindById(id,cb) {
        
        getProductfromfile((products) => {
            for (let i = 0; i < products.length ; i++)
                if (products[i].id === id)
                     cb(products[i]);
        });

    }

};
