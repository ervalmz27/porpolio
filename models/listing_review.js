
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class listing_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      listing_review.belongsTo(models.expert, {foreignKey: 'idExpert'})
      listing_review.belongsTo(models.expert_listing, {foreignKey: 'idExpert_listing'})
      listing_review.belongsTo(models.customer, {foreignKey: 'idcustomer'})
    }
  };
  listing_review.init({
    idExpert: DataTypes.INTEGER,
    idOrder: DataTypes.INTEGER,
    idExpert_listing: DataTypes.INTEGER,
    idcustomer: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment_rating: DataTypes.TEXT,
    is_hide: DataTypes.BOOLEAN,
    updated_by: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'listing_review',
    createdAt: 'created_at',
    updatedAt: false,
  });
  return listing_review;
};