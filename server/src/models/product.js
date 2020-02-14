'use strict'

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    photo: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    thisWeek: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  return Product;
};