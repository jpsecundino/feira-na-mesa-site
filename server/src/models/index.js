'use strict'

const Sequelize = require('sequelize');
const { createTestData } = require('./testData');

const sequelize = new Sequelize('feira', 'root', 'guigay', {
  host: process.env.DB_CONNECTION_STRING,
  dialect: 'mysql',
  logging: false,
  define: {
    paranoid: true,
    timestamps: true
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Product = sequelize.import(__dirname + '/product.js');
db.User = sequelize.import(__dirname + '/user.js');
// Here goes the associations


// Note: using `force: true` will drop the table if it already exists
sequelize.sync({ force: true })
  .then(() => {
    return createTestData(db);
  });

module.exports = db;
