const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class config_cache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  config_cache.init(
    {
      cache_name: DataTypes.STRING(50),
      layout_page: DataTypes.STRING(50),
      status: DataTypes.INTEGER,
      dummy: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      cache_filename: DataTypes.STRING(100),
      last_update: DataTypes.DATE,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'config_cache',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    }
  );
  return config_cache;
};
