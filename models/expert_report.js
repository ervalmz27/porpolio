const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class expert_report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      expert_report.belongsTo(models.expert, { foreignKey: 'id_expert' });
      expert_report.belongsTo(models.customer, { foreignKey: 'id_reportby' });
    }
  }
  expert_report.init(
    {
      id_expert: DataTypes.INTEGER,
      id_reportby: DataTypes.INTEGER,
      reason: DataTypes.TEXT,
      review_note: DataTypes.TEXT,
      review_by: DataTypes.STRING(20),
      review_date: DataTypes.DATE,
      created_by: DataTypes.STRING(50),
      updated_by: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: 'expert_report',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return expert_report;
};
