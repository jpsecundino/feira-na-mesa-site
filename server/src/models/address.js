'use strict'

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    houseNumber: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  });

  return Address;
};