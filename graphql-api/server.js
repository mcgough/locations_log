require('dotenv').config();
const cors = require('cors');
const express = require('express');
const express_graphql = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

let dev_db_url = `mongodb://${username}:${password}@ds131763.mlab.com:31763/dev-location-log`;

let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('*', express_graphql({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Running at port 4000');
});



