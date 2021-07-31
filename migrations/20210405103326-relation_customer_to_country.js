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
      'customers',
      'idcountry', {
        type: Sequelize.INTEGER,
        references: {
          model: 'countries',
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
      await queryInterface.changeColumn('customers', 'idcountry', { type: Sequelize.INTEGER });
    
  }
};