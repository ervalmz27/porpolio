const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class config_protip extends Model {
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
  config_protip.init(
    {
      section_name: DataTypes.STRING(50),
      title: DataTypes.STRING(50),
      message: DataTypes.TEXT,
      sort_index: DataTypes.INTEGER,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'config_protip',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return config_protip;
};
