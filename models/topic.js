
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      topic.belongsTo(models.category, {foreignKey: 'id_category'})
    }
  };
  topic.init({
    id_category: DataTypes.INTEGER,
    category_name: DataTypes.STRING(50),
    Status: DataTypes.INTEGER,
    topic_name: DataTypes.STRING(50),
    topic_desc: DataTypes.TEXT,
    updated_by: DataTypes.STRING(50),
    visit_count: DataTypes.INTEGER,
    image: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'topic',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return topic;
};