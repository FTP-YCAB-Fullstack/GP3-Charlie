'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.User,{foreignKey:"id"})
      this.hasOne(models.User,{foreignKey:"Teacher"})
      this.hasMany(models.Student,{foreignKey:"ClassId"})
    }
  };
  Class.init({
    name: DataTypes.STRING,
    Teacher: DataTypes.INTEGER(2)
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};