const { getDataBase } = require('../util/database');
const { ObjectId } = require('mongodb');
// the id of the object that comes from controller =>Sting
class Product {
    constructor(title, price, imageUrl, description, _id, userId) {// _id=> string , userId=> objectId
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = _id ? new ObjectId(_id) : null;
        this.userId =userId;
    }

    async save() {
        const database = getDataBase();
        const collection = database.collection('products');
        if (this._id) {
        
            await collection.updateOne({ _id: this._id }, { $set: this });
        } else {
        
            await collection.insertOne(this);
        }
    }

    static async fetchAll() {
        const database = getDataBase();
        const collection = database.collection('products');
        return await collection.find().toArray();
    }

    static async fetchOne(productId) {
        const database = getDataBase();
        const collection = database.collection('products');
      return await collection.findOne({ _id: new ObjectId(productId) });
     
    }


    static async deleteById(productId) {
        const database = getDataBase();
        const collection = database.collection('products');
        
        await collection.deleteOne({ _id: new ObjectId(productId) });
    }
}

module.exports = Product;
