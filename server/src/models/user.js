'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: DataTypes.STRING(64),
    adress: DataTypes.STRING(512),
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
	return User;
};