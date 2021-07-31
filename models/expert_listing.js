const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class expert_listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      expert_listing.belongsTo(models.expert, { foreignKey: 'idexpert' })
      expert_listing.belongsTo(models.topic, { foreignKey: 'idTopic' })
      expert_listing.belongsTo(models.customer, { foreignKey: 'idCustomer' })
      expert_listing.belongsTo(models.category, { foreignKey: 'idcategory' })
      expert_listing.hasOne(models.listing_index, { foreignKey: 'idlisting' })
    }
  };

  expert_listing.init({
    idexpert: DataTypes.INTEGER,
    idCustomer: DataTypes.INTEGER,
    idTopic: DataTypes.INTEGER,
    idcategory: DataTypes.INTEGER,
    categoryname: DataTypes.STRING(50),
    topicname: DataTypes.STRING(50),
    tags: DataTypes.TEXT,
    listing_image: DataTypes.TEXT,
    title_content: DataTypes.STRING(50),
    content_desc: DataTypes.TEXT,
    avg_rating: DataTypes.DECIMAL(4, 1),
    total_call: DataTypes.INTEGER,
    is_toprated: DataTypes.BOOLEAN,
    top_review: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    created_by: DataTypes.STRING(50),
    updated_by: DataTypes.STRING(50),
    rate_per_minute: DataTypes.DECIMAL(10, 2),
    expert_name: DataTypes.STRING(50),
    total_review: DataTypes.INTEGER,
    visit_count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'expert_listing',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return expert_listing;
};
