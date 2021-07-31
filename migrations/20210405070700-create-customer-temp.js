'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer_temps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      device_id: {
        type: Sequelize.STRING
      },
      password_encrypted: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING(50)
      },
      is_expert: {
        type: Sequelize.BOOLEAN
      },
      created_by: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('customer_temps');
  }
};