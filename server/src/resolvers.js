const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    products: async (_, __, { dataSources }) => {
      const allProducts = await dataSources.productAPI.getAllProducts();
      // We want these in reverse chronological order
      return allProducts.reverse();
    },
    product: () => console.log("Not implemented yet :("),
    weekProducts: () => console.log("Not implemented yet :("),
    user: (_, {id}, { dataSources }) => {
      return await dataSources.UserAPI.getUserbyID();  
    },
  },

  Mutation: {
    addProduct: () => console.log("Not implemented yet :("),
    removeProduct: () => console.log("Not implemented yet :("),
    addToWeekProducts: () => console.log("Not implemented yet :("),
    removeFromWeekProducts: () => console.log("Not implemented yet :("),
  },
};
