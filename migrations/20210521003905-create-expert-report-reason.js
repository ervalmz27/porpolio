module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expert_report_reasons', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      reason: { type: Sequelize.STRING(50) },
      sort_index: { type: Sequelize.INTEGER },
      created_by: { type: Sequelize.STRING(50) },
      updated_by: { type: Sequelize.STRING(50) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('expert_report_reasons');
  },
};
