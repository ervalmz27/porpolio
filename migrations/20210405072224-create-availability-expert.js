'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('availability_experts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      available_day: {
        type: Sequelize.STRING(10)
      },
      start_time: {
        type: Sequelize.STRING(6)
      },
      finish_time: {
        type: Sequelize.STRING(6)
      },
      idcustomer: {
        type: Sequelize.INTEGER
      },
      available_day_id: {
        type: Sequelize.INTEGER
      },
      is_everyday: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('availability_experts');
  }
};