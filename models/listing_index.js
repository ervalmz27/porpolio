
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class listing_index extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  };
  listing_index.init({
    idlisting: DataTypes.INTEGER,
    index_visit: DataTypes.FLOAT,
    index_booking: DataTypes.FLOAT,
    index_rating: DataTypes.FLOAT,
    index_popular: DataTypes.FLOAT,
    updated_by: DataTypes.STRING(50),
  }, {
    sequelize,
    modelName: 'listing_index',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return listing_index;
};
