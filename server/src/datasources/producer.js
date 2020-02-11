const { DataSource } = require('apollo-datasource');

class ProducerAPI extends DataSource {
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

  async getAllProducers() {
    const response = await this.db.Producer.findAll();
    return response ? response : [];
  }
