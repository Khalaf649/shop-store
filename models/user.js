const { getDataBase } = require('../util/database');
const { ObjectId } = require('mongodb');

class User {
    constructor(UserName, UserEmail, _id) {
        this.UserName = UserName;
        this.UserEmail = UserEmail;
        this._id = _id ? new ObjectId(_id) : null;
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
}

module.exports = User;
