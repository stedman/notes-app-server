const { ObjectId } = require('mongodb');
const { getDB } = require('../config/dbConnect');

class MongoDbRepo {
  constructor(collectionName) {
    this.collection = getDB().collection(collectionName);
  }

  create(opt) {
    return new Promise((resolve, reject) => {
      this.collection.insertOne(opt, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.ops[0]);
      });
      1;
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.collection.find({}).toArray((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  getById(_id) {
    return new Promise((resolve, reject) => {
      this.collection.findOne({ _id: ObjectId(_id) }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  updateOne(_id, opt) {
    return new Promise((resolve, reject) => {
      this.collection.findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: opt },
        { returnOriginal: false },
        (err, data) => {
          if (err) {
            reject(err);
          }

          resolve(data.value);
        },
      );
    });
  }

  deleteOne(_id) {
    return new Promise((resolve, reject) => {
      this.collection.findOneAndDelete({ _id: ObjectId(_id) }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

module.exports = MongoDbRepo;
