module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expert_reports', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      id_expert: { type: Sequelize.INTEGER },
      id_reportby: { type: Sequelize.INTEGER },
      reason: { type: Sequelize.TEXT },
      review_note: { type: Sequelize.TEXT },
      review_by: { type: Sequelize.STRING(20) },
      review_date: { type: Sequelize.DATE },
      created_by: { type: Sequelize.STRING(50) },
      updated_by: { type: Sequelize.STRING(50) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('expert_reports');
  },
};
