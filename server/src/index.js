const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const db = require('./models/index.js');  // Sequelize connection

const ProductAPI = require('./datasources/product');
const UserAPI = require('./datasources/user');

// Set up any dataSources our resolvers need
const dataSources = () => ({
  productAPI: new ProductAPI(db),
  userAPI: new UserAPI(db),
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
};

// IP adress of cloud db: 35.231.163.112