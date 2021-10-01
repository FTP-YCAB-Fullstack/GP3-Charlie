'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Score.belongsTo(models.Mapel, {
      //   foreignKey: 'id'
      // })
      // this.belongsToMany(models.Student,{through:"studentId"})
      this.belongsToMany(models.Student,{through : "Scores",sourceKey : "studentId"})
      this.belongsToMany(models.Mapel,{through : "Scores",sourceKey: "MapelId"})
    }
  };
  Score.init({
    studentId: DataTypes.INTEGER,
    MapelId: DataTypes.INTEGER,
    grade: DataTypes.STRING(2)
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};