'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn(
      'customer_verifications',
      'idcustomer_temp', {
        type: Sequelize.INTEGER,
        references: {
          model: 'customer_temps',
          key: 'id'
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('customer_verifications', 'idcustomer_temp', {
      type: Sequelize.INTEGER
    });
  }
};