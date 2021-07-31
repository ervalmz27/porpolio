'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('topics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_category: {
        type: Sequelize.INTEGER
      },
      category_name: {
        type: Sequelize.STRING(50)
      },
      Status: {
        type: Sequelize.INTEGER
      },
      topic_name: {
        type: Sequelize.STRING(50)
      },
      topic_desc: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(50)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('topics');
  }
};