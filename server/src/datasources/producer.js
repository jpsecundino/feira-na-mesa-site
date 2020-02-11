const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');

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

  async getProducerByCPFOrCNPJ({ CPF, CNPJ }) {
    return await this.db.Producer.findOne({
      where: {
        [Op.or]: [
          { cpf: CPF },
          { cnpj: CNPJ }
        ]
      }
    });
  }
}

module.exports = ProducerAPI;