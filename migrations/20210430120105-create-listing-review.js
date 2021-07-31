'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('listing_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idExpert: {
        type: Sequelize.INTEGER
      },
      idOrder: {
        type: Sequelize.INTEGER
      },
      idExpert_listing: {
        type: Sequelize.INTEGER
      },
      idcustomer: {
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      comment_rating: {
        type: Sequelize.TEXT
      },
      is_hide: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(50)
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('listing_reviews');
  }
};