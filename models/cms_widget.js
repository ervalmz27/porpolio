const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cms_widget extends Model {
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
  cms_widget.init(
    {
      widget_name: DataTypes.STRING(50),
      content: DataTypes.TEXT,
      status: DataTypes.BOOLEAN,
      widget_parameter: DataTypes.STRING(50),
      layout_page: DataTypes.STRING(50),
      layout_page_section: DataTypes.STRING(50),
      sort_index: DataTypes.INTEGER,
      widget_type: DataTypes.STRING(50),
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'cms_widget',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      freezeTableName: true,
    }
  );
  return cms_widget;
};
