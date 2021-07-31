'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'master_languages',
      'version',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('master_language', 'version');
  },
};
