
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class config_session_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  };
  config_session_time.init({
    config_time: DataTypes.STRING(5),
    config_minimum: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'config_session_time',
  });
  return config_session_time;
};