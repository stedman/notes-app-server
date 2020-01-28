const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const app = express();

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
