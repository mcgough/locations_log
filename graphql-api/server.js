require('dotenv').config()
const cors = require('cors');
const express = require('express');
const express_graphql = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const mongoose = require('mongoose');

const app = express();

const { DB_USER, DB_PASS } = process.env;
const dev_db_url = `mongodb://${DB_USER}:${DB_PASS}@ds131763.mlab.com:31763/dev-location-log`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

app.use('*',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  express_graphql({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  }),
);

app.listen(4000, () => {
  console.log('Running at port 4000');
});



