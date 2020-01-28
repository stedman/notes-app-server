const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { setupDB } = require('../config/dbConnect');

const app = express();

// DB
// eslint-disable-next-line no-console
setupDB((v) => console.log(v));

// CORS
app.use(cors());

// GRAPHQL
const schema = {};
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  }),
);

app.listen(4000);

// LOG
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${new Date().toUTCString()}  ${req.method}  ${req.originalUrl}`);
  next();
});
