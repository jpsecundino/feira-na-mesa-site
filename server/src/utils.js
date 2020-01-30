const Sequelize = require('sequelize');
const { createTestData } = require('./indata');

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // Can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // If an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // If there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // Don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const sequelize = new Sequelize('feira', 'root', 'guigay', {
    host: process.env.DB_CONNECTION_STRING,
    dialect: 'mysql',
    logging: false,
    define: {
      paranoid: true,
      timestamps: true
    },
  });

  // Note: using `force: true` will drop the table if it already exists
  sequelize.sync({ force: true })
    .then(() => {
      return createTestData();
    });

  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: Sequelize.FLOAT,
    photo: {
      type: Sequelize.STRING(512),
      allowNull: false,
    },
    description: Sequelize.TEXT,
    thisWeek: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });

  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: Sequelize.STRING(64),
    adress: Sequelize.STRING(512),
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // Relational content
    // An user has a history of purchase requests
    // and furthermore...
  });

  return { Product, User };
};
