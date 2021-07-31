'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('config_session_times', 'config_minimum', Sequelize.DOUBLE)
    await queryInterface.addColumn('config_session_times', 'finish_time', Sequelize.STRING(5))
    await queryInterface.addColumn('config_session_times', 'start_time', Sequelize.STRING(5))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('config_session_times', 'finish_time')
    await queryInterface.removeColumn('config_session_times', 'start_time')
  }
};
