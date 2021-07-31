'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('countries',
      [{
          country: 'indonesia',
          country_code: '1',
          created_by: 'admin',
          updated_by: 'admin',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          country: 'malaysia',
          country_code: '2',
          created_by: 'admin',
          updated_by: 'admin',
          updatedAt: new Date(),
          createdAt: new Date()
        }
      ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('countries', null, {})
  }
};