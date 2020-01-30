const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests.
   */
  initialize(config) {
    this.context = config.context;
  }

  async getUserByID({ userID }) {
    return await this.db.User.findByPk(userID);
  }
}

module.exports = UserAPI;
