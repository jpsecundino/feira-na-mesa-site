const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const { createStore } = require('./utils');

const ProductAPI = require('./datasources/product');

// Creates a sequelize connection once. NOT for every request
const store = createStore();

// Set up any dataSources our resolvers need
const dataSources = () => ({
  productAPI: new ProductAPI({ store }),
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
  store,
  server,
};

// IP adress of db: 35.231.163.112