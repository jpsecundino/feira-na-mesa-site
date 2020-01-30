const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    products: async (_, __, { dataSources }) => {
      const allProducts = await dataSources.productAPI.getAllProducts();
      // We want these in reverse chronological order
      return allProducts.reverse();
    },
    product: async (_, { id }, { dataSources }) => 
      await dataSources.productAPI.getProductByID({ productID: id }),
    weekProducts: async (_, __, { dataSources }) => {
      const weekProducts = await dataSources.productAPI.getWeekProducts();
      // We want these in reverse chronological order
      return weekProducts.reverse();
    },
    user: async (_, { id }, { dataSources }) => 
      await dataSources.userAPI.getUserByID({ userID: id }),
  },

  Mutation: {
    addProduct: () => console.log("Not implemented yet :("),
    removeProduct: () => console.log("Not implemented yet :("),
    addToWeekProducts: () => console.log("Not implemented yet :("),
    removeFromWeekProducts: () => console.log("Not implemented yet :("),
  },
};
