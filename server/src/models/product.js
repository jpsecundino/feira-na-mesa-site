'use strict'

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: DataTypes.FLOAT,
    photo: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    description: DataTypes.TEXT,
    thisWeek: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  return Product;
};