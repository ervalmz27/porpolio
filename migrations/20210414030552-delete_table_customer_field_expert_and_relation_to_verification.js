'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('customers', 'is_expert_time')
    await queryInterface.removeColumn('customers', 'block_status_exp')
    await queryInterface.removeColumn('customers', 'expert_about')
    //await queryInterface.removeColumn('customers', 'profileimage')
    await queryInterface.removeColumn('customers', 'language')
    await queryInterface.removeColumn('customers', 'expertise')
    await queryInterface.removeColumn('customers', 'currency')
    await queryInterface.removeColumn('customers', 'expert_rate_minute')
    await queryInterface.removeColumn('customers', 'expert_rate_hour')
    await queryInterface.removeColumn('customers', 'lastrateupdate')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('customers', {
      is_expert_time: {
        type: Sequelize.DATE
      },
      block_status_exp: {
        type: Sequelize.DATE
      },
      expert_about: {
        type: Sequelize.TEXT
      },
      // profileimage: {
      //   type: Sequelize.TEXT
      // },
      language: {
        type: Sequelize.TEXT
      },
      expertise: {
        type: Sequelize.TEXT
      },
      currency: {
        type: Sequelize.STRING(5)
      },
      expert_rate_minute: {
        type: Sequelize.DECIMAL(10, 2)
      },
      expert_rate_hour: {
        type: Sequelize.DECIMAL(10, 2)
      },
      lastrateupdate: {
        type: Sequelize.DATE
      }
    })
  }
};