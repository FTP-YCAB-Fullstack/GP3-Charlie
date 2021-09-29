'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING(100),
    email: {
      type:DataTypes.STRING(100),
    },
    password: DataTypes.STRING(100),
    role: DataTypes.ENUM("admin","teacher")
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};