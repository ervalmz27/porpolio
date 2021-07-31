'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(30)
      },
      password_encrypted: {
        type: Sequelize.STRING
      },
      fname: {
        type: Sequelize.STRING(50)
      },
      lname: {
        type: Sequelize.STRING(50)
      },
      birthdate: {
        type: Sequelize.DATE
      },
      idcity: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING(50)
      },
      idcountry: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING(50)
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
      is_expert: {
        type: Sequelize.BOOLEAN
      },
      // is_expert_time: {
      //   type: Sequelize.DATE
      // },
      // block_status_exp: {
      //   type: Sequelize.DATE
      // },
      // expert_about: {
      //   type: Sequelize.TEXT
      // },
      // profileimage: {
      //   type: Sequelize.TEXT
      // },
      // language: {
      //   type: Sequelize.TEXT
      // },
      // expertise: {
      //   type: Sequelize.TEXT
      // },
      // currency: {
      //   type: Sequelize.STRING(5)
      // },
      // expert_rate_minute: {
      //   type: Sequelize.DECIMAL(10,2)
      // },
      // expert_rate_hour: {
      //   type: Sequelize.DECIMAL(10,2)
      // },
      // lastrateupdate: {
      //   type: Sequelize.DATE
      // },
      note1: {
        type: Sequelize.TEXT
      },
      note2: {
        type: Sequelize.TEXT
      },
      note3: {
        type: Sequelize.TEXT
      },
      created_by: {
        type: Sequelize.STRING(20)
      },
      updated_by: {
        type: Sequelize.STRING(20)
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
    await queryInterface.dropTable('customers');
  }
};