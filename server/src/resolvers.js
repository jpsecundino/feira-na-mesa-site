const { transporter } = require('./index');
const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    products: async (_, __, { dataSources }) => {
      const allProducts = await dataSources.productAPI.getAllProducts();
      // We want these in reverse chronological order
      return allProducts.reverse();
    },
    product: async (_, { id }, { dataSources }) => await dataSources.productAPI.getProductByID(id),
    weekProducts: async (_, __, { dataSources }) => {
      const weekProducts = await dataSources.productAPI.getWeekProducts();
      // We want these in reverse chronological order
      return weekProducts.reverse();
    },
    users: async (_, __, { dataSources }) => {
      const allUsers = await dataSources.userAPI.getAllUsers();
      // We want these in reverse chronological order
      return allUsers.reverse();
    },
    user: async (_, { cpf }, { dataSources }) => await dataSources.userAPI.getUserByCPF(cpf),
    producers: async (_, __, { dataSources }) => {
      const allProducers = await dataSources.producerAPI.getAllProducers();
      // We want these in reverse chronological order
      return allProducers.reverse();
    },
    producer: async (_, { cpf, cnpj }, { dataSources }) => await dataSources.producerAPI.getProducerByCPFOrCNPJ({ CPF: cpf, CNPJ: cnpj }),
  },
  Mutation: {
    addProduct: () => console.log("Not implemented yet :("),
    removeProduct: () => console.log("Not implemented yet :("),
    addToWeekProducts: () => console.log("Not implemented yet :("),
    removeFromWeekProducts: () => console.log("Not implemented yet :("),
  },
  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      return null;
    },
  },
};
