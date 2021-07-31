

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('orders', 'idExpertListing', {
    // type: Sequelize.INTEGER,
    // allowNull: false,
    // references: { model: 'expert_listings', key: 'id' },
    // });

    // await queryInterface.addColumn('orders', 'idExpert', {
    //   type: Sequelize.INTEGER,
    //   // allowNull: false,
    //   references: { model: 'expert_listings', key: 'id' },
    // });
    // await queryInterface.addColumn('orders', 'idCustomer', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: { model: 'customers', key: 'id' },
    // });

    // await queryInterface.addColumn('orders', 'idTopic', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: { model: 'topics', key: 'id' },
    // });
    // await queryInterface.addColumn('orders', 'idCategory', {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: { model: 'categories', key: 'id' },
    // });
    // await queryInterface.addColumn('orders', 'fname', { type: Sequelize.STRING(50) });
    // await queryInterface.addColumn('orders', 'lname', { type: Sequelize.STRING(50) });
    await queryInterface.addColumn('orders', 'approval_expert', { type: Sequelize.DATE });
    await queryInterface.addColumn('orders', 'approval_expert_note', { type: Sequelize.STRING(100) });
  },

  // down: async (queryInterface, Sequelize) => {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
  // await queryInterface.removeColumn('orders', 'idExpert');
  // await queryInterface.removeColumn('orders', 'idCostumer');
  // },
};
