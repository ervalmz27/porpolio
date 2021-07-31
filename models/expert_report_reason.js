const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class expert_report_reason extends Model {
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
  expert_report_reason.init(
    {
      reason: DataTypes.STRING(50),
      sort_index: DataTypes.INTEGER,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'expert_report_reason',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return expert_report_reason;
};
