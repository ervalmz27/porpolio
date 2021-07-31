const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cms_page extends Model {
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
  cms_page.init(
    {
      page_name: DataTypes.STRING(50),
      content: DataTypes.TEXT,
      status: DataTypes.INTEGER,
      page_url: DataTypes.STRING(50),
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'cms_page',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return cms_page;
};
