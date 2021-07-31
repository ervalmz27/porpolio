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
    await queryInterface.bulkInsert('cities',
      [{
          idcountry: '1',
          city: 'bandung',
          description: 'kota besar',
          created_by: 'admin',
          updated_by: 'admin',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          idcountry: '1',
          city: 'jakarta',
          description: 'kota besar',
          created_by: 'admin',
          updated_by: 'admin',
          updatedAt: new Date(),
          createdAt: new Date()
        },
        {
          idcountry: '2',
          city: 'kuala lumpur',
          description: 'kota besar',
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
    await queryInterface.bulkDelete('cities', null, {})
  }
};