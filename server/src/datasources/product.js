const { DataSource } = require('apollo-datasource');

class ProductAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context.
   */
  initialize(config) {
    this.context = config.context;
  }

  async getAllProducts() { 
    const response = await this.store.Product.findAll();
    return response ? response : [];
  }
}

module.exports = ProductAPI;
