const Sequelize = require('sequelize');

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
      paranoid: true
    },
  });

  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      field: 'productID',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      field: 'productName',
      allowNull: false,
    },
    price: Sequelize.FLOAT,
    photo: {
      type: Sequelize.STRING(512),
      field: 'photoPath',
      allowNull: false,
    },
    description: Sequelize.TEXT,
    thisWeek: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
  
  return { Product };
};
