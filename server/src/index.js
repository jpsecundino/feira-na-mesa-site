const { ApolloServer } = require('apollo-server');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const depthLimit = require('graphql-depth-limit');
const ConstraintDirective = require('apollo-server-constraint-directive');

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

const complexityLimitRule = createComplexityLimitRule(2000, {
  scalarCost: 1,
  objectCost: 10, // Default is 0.
  listFactor: 20, // Default is 10.
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || '';
   
    // try to retrieve a user with the token
    const user = getUser(token);
   
    // optionally block the user
    // we could also check user roles/permissions here
    //if (!user) throw new AuthenticationError('you must be logged in'); 
   
    // add the user to the context
    return { user };
  },
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [depthLimit(7), complexityLimitRule],
  schemaDirectives: {
    constraint: ConstraintDirective,
  },
  formatError: (err) => {
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    }
    return err;
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });

module.exports = {
  //dataSources,
  //typeDefs,
  //resolvers,
  //ApolloServer,
  //ProductAPI,
  //db,
  server,
  transporter,
};
