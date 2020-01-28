const { MongoClient } = require('mongodb');
const secret = require('./.secret.json');

let mongoDB;

const setupDB = (callback) => {
  const uri = `mongodb+srv://${secret.mongodb.user}:${secret.mongodb.password}@cluster0-4unr4.mongodb.net/test?retryWrites=true&w=majority`;

  MongoClient.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      mongoDB = client.db('notes-server');

      if (err) {
        return callback(err);
      }
      return callback('DB ready');
    },
  );
};

const getDB = () => mongoDB;

module.exports = { setupDB, getDB };
