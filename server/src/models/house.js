'use strict'

module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define('House', {
    id: DataTypes.INTEGER,
    cep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    district:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    houseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return House;
};