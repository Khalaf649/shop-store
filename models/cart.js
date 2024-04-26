const fs = require('fs');
const path = require('path');
const product = require('../models/products');
const maindir = require('../util/path');
let p = path.join(maindir, 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, price) {
        fs.readFile(p, (err, data) => {
            let cart = { prods: [], TotalPrice: 0, TotalQuantity: 0 }; // Corrected property name: TotalQuantity
            if (!err) {
                cart = JSON.parse(data);
            }
            let search = -1;
            for (let i = 0; i <cart.prods.length; i++) {
                if (cart.prods[i].id === id) {
                    search = i;
                    break;
                }
            }
            if (search !== -1) {
                cart.prods[search].qty += 1;
                cart.prods[search].TotalPrice += Number(price);
            } else {
                let newProduct = {
                    id: id,
                    qty: 1,
                    TotalPrice: Number(price)
                };
                cart.prods.push(newProduct);
            }
            cart.TotalQuantity++; // Increment TotalQuantity
            cart.TotalPrice += Number(price); // Convert price to a number before adding to TotalPrice

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}
