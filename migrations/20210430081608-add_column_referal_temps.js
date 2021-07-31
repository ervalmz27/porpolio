'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('customer_temps', 'referral_code', Sequelize.STRING(10))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('customer_temps', 'referral_code')
  }
};
