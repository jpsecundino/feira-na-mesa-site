'use strict'

module.exports = (sequelize, DataTypes) => {
  const Producer = sequelize.define('producer', {
    cpf: {
      type: DataTypes.STRING(11),
      unique: true,
    },
    cnpj: {
      type: DataTypes.STRING(14),
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    history: DataTypes.TEXT,
    phoneNumber1: DataTypes.STRING(64),
    phoneNumber2: DataTypes.STRING(64),
  });

  return Producer;
};