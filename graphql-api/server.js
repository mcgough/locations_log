const cors = require('cors');
const express = require('express');
const express_graphql = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const app = express();

app.use(cors());

app.use('*', express_graphql({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Running at port 4000');
});



