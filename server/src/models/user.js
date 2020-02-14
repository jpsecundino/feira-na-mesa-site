'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: DataTypes.STRING,
    phoneNumber1: DataTypes.STRING(64),
    phoneNumber2: DataTypes.STRING(64),
    totalSpent: DataTypes.FLOAT,
  });
  
	return User;
};