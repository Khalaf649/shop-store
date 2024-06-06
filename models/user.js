const { getDataBase } = require('../util/database');
const { ObjectId } = require('mongodb');
const Product = require('./product');
/**
 * cart={
 * items: [ {prodiD: ,Quantity:  Price:}],
 * TotalPrice:   ,
 * TOtalQuantity:
 * 
 * }
 */
class User {
    constructor(userName, userEmail, _id, cart) {
        this.userName = userName;
        this.userEmail = userEmail;
        this._id = _id ? new ObjectId(_id) : null;
        this.cart = cart?cart:{items:[]};

    }
    async addToCart(product)// if its the first time to be added or added before
    {

        const updatedCart = { ...this.cart };
        const index = updatedCart.items.findIndex(cb => {
            return cb.productId.toString() === product._id.toString()
        })
        if (index != -1) {
          updatedCart.items[index].quantity+=1;
        }
        else
        {
            updatedCart.items.push({
                productId:product._id,
                quantity:1
            })
        }
       
        const database = getDataBase();
        const collection = database.collection('users');
        await collection.updateOne({ _id: this._id }, {
            $set: {
                cart: updatedCart
            }
        });


    }

    async save() {
        try {
            const database = getDataBase();
            const collection = database.collection('users');
            if (this._id) {
                await collection.updateOne({ _id: this._id }, { $set: this });
            } else {
                await collection.insertOne(this);
            }
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    }

    // addToCart(product) {
    //     const index = this.cart.items.findIndex(item => item.ProductId._id === product._id());
    //     if (index === -1) {
    //         this.cart.items.push({
    //             ProductId: product._id.toString(),
    //             Quantity: 1,
    //             Price: product.price
    //         });
    //     } else {
    //         this.cart.items[index].Quantity += 1;
    //         this.cart.items[index].Price += product.price;
    //     }
    //     this.cart.totalQuantity += 1;
    //     this.cart.totalPrice += product.price;
    //     console.log(this.cart);
    // }

    static async fetchOne(UserId) {
        try {
            const database = getDataBase();
            const collection = database.collection('users');
            return await collection.findOne({ _id: new ObjectId(UserId) });


        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    static async fetchAll() {
        try {
            const database = getDataBase();
            const collection = database.collection('users');
            return await collection.find().toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async deleteOne(UserId) {
        try {
            const database = getDataBase();
            const collection = database.collection('users');
            await collection.deleteOne({ _id: new ObjectId(UserId) });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
   async getCart()
    {
      
        const db=getDataBase();
        const collection=db.collection('products');
        const  cartProductid=this.cart.items.map(i=>{
            return i.productId;
        })
         const products=await collection.find({_id:{$in:cartProductid}}).toArray();
         const ans=products.map(i=>{
            return {...i,quantity:this.cart.items.find(x=>{
                return x.productId.toString()===i._id.toString();
            }).quantity}
         })
        
return ans;
    }
   async deleteFromCart(productID) {
        let items = this.cart.items;
        const index = items.findIndex(c => {
            return c.productId.toString() === productID.toString();
        });
    
       items.splice(index,1);
       const db=getDataBase();
       const collection=db.collection('users');
      await collection.updateOne({_id:this._id},{$set:{
        cart:this.cart
       }})
    }
    
}

module.exports = User;
