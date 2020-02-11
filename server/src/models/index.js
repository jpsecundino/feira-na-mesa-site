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

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Product = sequelize.import(__dirname + '/product.js');
db.User = sequelize.import(__dirname + '/user.js');
db.Address = sequelize.import(__dirname + '/address.js');
db.Producer = sequelize.import(__dirname + '/producer.js');
db.Order = sequelize.import(__dirname + '/order.js');
db.OrderLine = sequelize.import(__dirname + '/orderLine.js');

//Relations
db.User.hasMany(db.Address);
db.User.hasMany(db.Order);
db.Product.belongsToMany(db.Producer, {through: 'ProductRelation'});
db.Producer.hasMany(db.Address);
db.Producer.hasMany(db.Product);
db.Address.belongsTo(db.User);
db.Order.belongsTo(db.User);
db.Order.hasMany(db.OrderLine);
db.Order.hasOne(db.Address);
db.OrderLine.hasMany(db.Product);

// Note: using `force: true` will drop the table if it already exists
sequelize.sync({ force: true })
  .then(() => {
    return createTestData(db);
  });

module.exports = db;