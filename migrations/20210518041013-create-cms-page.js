module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cms_pages', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      page_name: { type: Sequelize.STRING(50) },
      content: { type: Sequelize.TEXT },
      status: { type: Sequelize.INTEGER },
      page_url: { type: Sequelize.STRING(50) },
      created_by: { type: Sequelize.STRING(50) },
      updated_by: { type: Sequelize.STRING(50) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cms_pages');
  },
};
