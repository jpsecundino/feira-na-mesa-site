const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./models/index');  // Sequelize connection

const ProductAPI = require('./datasources/product');
const UserAPI = require('./datasources/user');
const ProducerAPI = require('./datasources/producer');

const nodemailer = require('nodemailer');

// Set up any dataSources our resolvers need
const dataSources = () => ({
  productAPI: new ProductAPI(db),
  userAPI: new UserAPI(db),
  producerAPI: new ProducerAPI(db),
});

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'feiranamesaorganicos@gmail.com',
    pass: process.env.EMAIL_PASSWORD,
  }
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  // context, (not yet; we will only put it when we add the login feature)
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

module.exports = {
  dataSources,
  typeDefs,
  resolvers,
  ApolloServer,
  ProductAPI,
  db,
  server,
  transporter,
};
