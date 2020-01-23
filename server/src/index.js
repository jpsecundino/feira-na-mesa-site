/* const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports = {
  typeDefs,
  resolvers,
  ApolloServer,
  server,
}; */

const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const server = express();

server.get("/", (req, res) => {
  res.send("Gui Gay");
});

server.listen(PORT, HOST);
