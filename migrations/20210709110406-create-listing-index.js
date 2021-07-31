
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('listing_indices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idlisting: {
        type: Sequelize.INTEGER
      },
      index_visit: {
        type: Sequelize.FLOAT
      },
      index_booking: {
        type: Sequelize.FLOAT
      },
      index_rating: {
        type: Sequelize.FLOAT
      },
      index_popular: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(50)
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('listing_indices');
  }
};
