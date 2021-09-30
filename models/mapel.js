'use strict';
const {
  Model
} = require('sequelize');
const score = require('./score');
module.exports = (sequelize, DataTypes) => {
  class Mapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mapel.hasMany(models.Score, {
        foreignKey: 'MapelId'
      });
    }
  };
  Mapel.init({
    nama_mapel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mapel',
  });
  return Mapel;
};