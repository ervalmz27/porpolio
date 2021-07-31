module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cms_widget', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      widget_name: { type: Sequelize.STRING(50) },
      content: { type: Sequelize.TEXT },
      status: { type: Sequelize.BOOLEAN },
      widget_parameter: { type: Sequelize.STRING(50) },
      layout_page: { type: Sequelize.STRING(50) },
      layout_page_section: { type: Sequelize.STRING(50) },
      sort_index: { type: Sequelize.INTEGER },
      widget_type: { type: Sequelize.STRING(50) },
      created_by: { type: Sequelize.STRING(50) },
      updated_by: { type: Sequelize.STRING(50) },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cms_widget');
  },
};
