module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('config_cache', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      cache_name: { type: Sequelize.STRING(50) },
      layout_page: { type: Sequelize.STRING(50) },
      status: { type: Sequelize.INTEGER },
      content: { type: Sequelize.TEXT },
      cache_filename: { type: Sequelize.STRING(100) },
      last_update: { type: Sequelize.DATE },
      created_by: { type: Sequelize.STRING(50) },
      updated_by: { type: Sequelize.STRING(50) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('config_cache');
  },
};
