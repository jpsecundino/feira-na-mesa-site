'use strict'

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    totalValue: DataTypes.FLOAT,
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    failed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  return Order;
};