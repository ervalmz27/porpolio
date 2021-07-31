'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('experts', 'get_referal_code', 'referred_by')
    await queryInterface.addColumn('experts', 'avg_rating', {type: Sequelize.DECIMAL(4,1)})
    await queryInterface.addColumn('experts', 'total_call', {type: Sequelize.INTEGER})
    await queryInterface.addColumn('experts', 'total_review', {type: Sequelize.INTEGER})
    await queryInterface.addColumn('experts', 'top_review', {type: Sequelize.TEXT})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('experts', 'referred_by', 'get_referal_code')
    await queryInterface.removeColumn('experts', 'avg_rating')
    await queryInterface.removeColumn('experts', 'total_call')
    await queryInterface.removeColumn('experts', 'total_review')
    await queryInterface.removeColumn('experts', 'top_review')
  }
};
