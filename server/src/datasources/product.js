const { DataSource } = require('apollo-datasource');

class ProductAPI extends DataSource {
  constructor(db) {
    super();
    this.db = db;
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
    const response = await this.db.Product.findAll();
    return response ? response : [];
  }

  async getProductByID({ productID }) {
    return await this.db.Product.findByPk(productID);
  }

  async getWeekProducts() { 
    const response = await this.db.Product.findAll({
      where: {
        thisWeek: true,
      }
    });
    return response ? response : [];
  }
}

module.exports = ProductAPI;
