'use strict'

module.exports = (sequelize, DataTypes) => {
  const OrderLine = sequelize.define('orderLine', {
    isBasket: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  });

  return OrderLine;
};