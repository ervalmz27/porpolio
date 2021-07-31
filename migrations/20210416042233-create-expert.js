'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('experts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idcustomer: {
        type: Sequelize.INTEGER
      },
      block_status_cust: {
        type: Sequelize.BOOLEAN
      },
      custsignupdate: {
        type: Sequelize.DATE
      },
      is_verified: {
        type: Sequelize.BOOLEAN
      },
      city: {
        type: Sequelize.STRING(50)
      },
      country: {
        type: Sequelize.STRING(50)
      },
      is_expert: {
        type: Sequelize.BOOLEAN
      },
      is_expert_time: {
        type: Sequelize.DATE
      },
      block_status_exp: {
        type: Sequelize.BOOLEAN
      },
      expert_about: {
        type: Sequelize.TEXT
      },
      profileimage: {
        type: Sequelize.STRING
      },
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
        type: Sequelize.DECIMAL(10,2)
      },
      expert_rate_hour: {
        type: Sequelize.DECIMAL(10,2)
      },
      lastrateupdate: {
        type: Sequelize.DATE
      },
      background_image: {
        type: Sequelize.TEXT
      },
      note_1: {
        type: Sequelize.TEXT
      },
      note_2: {
        type: Sequelize.TEXT
      },
      note_3: {
        type: Sequelize.TEXT
      },
      referal_code: {
        type: Sequelize.STRING(10)
      },
      get_referal_code: {
        type: Sequelize.STRING(10)
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('experts');
  }
};