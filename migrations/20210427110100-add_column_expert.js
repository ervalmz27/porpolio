'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('experts', 'profile_headline', Sequelize.STRING(145))
    await queryInterface.addColumn('experts', 'background', Sequelize.TEXT)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('experts', 'profile_headline')
    await queryInterface.removeColumn('experts', 'background')
  }
};
