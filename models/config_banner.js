const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class config_banner extends Model {
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
  config_banner.init(
    {
      section_name: DataTypes.STRING(50),
      title: DataTypes.STRING(50),
      image: DataTypes.TEXT,
      redirecturl: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      sort_index: DataTypes.INTEGER,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'config_banner',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    }
  );
  return config_banner;
};
