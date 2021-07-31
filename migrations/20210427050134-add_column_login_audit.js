'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('login_audits', 'isBiodataFilled', Sequelize.BOOLEAN)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('login_audits', 'isBiodataFilled')
  }
};
