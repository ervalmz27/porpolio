module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // idExpert: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'experts', key: 'id' },
      // },
      // idExpertListing: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'expert_listings', key: 'id' },
      // },
      // idCustomer: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'customers', key: 'id' },
      // },
      // idTopic: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'topics', key: 'id' },
      // },
      // idCategory: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: { model: 'categories', key: 'id' },
      // },
      // fname: {
      //   type: Sequelize.STRING(50),
      // },
      // lname: {
      //   type: Sequelize.STRING(50),
      // },
      book_starttime1: {
        type: Sequelize.DATE,
      },
      book_endtime1: {
        type: Sequelize.DATE,
      },
      book_starttime2: {
        type: Sequelize.DATE,
      },
      book_endtime2: {
        type: Sequelize.DATE,
      },
      book_starttime3: {
        type: Sequelize.DATE,
      },
      book_endtime3: {
        type: Sequelize.DATE,
      },
      book_duration: {
        type: Sequelize.INTEGER,
      },
      expert_rate: {
        type: Sequelize.DECIMAL(10, 2),
      },
      currency: {
        type: Sequelize.STRING(50),
      },
      title_content: {
        type: Sequelize.STRING(50),
      },
      topic_name: {
        type: Sequelize.STRING(50),
      },
      categoyry_name: {
        type: Sequelize.STRING(50),
      },
      payment_onhold_time: {
        type: Sequelize.DATE,
      },
      payment_onhold_duedate: {
        type: Sequelize.DATE,
      },
      payment_method: {
        type: Sequelize.STRING(50),
      },
      payment_onhold_status: {
        type: Sequelize.STRING(20),
      },

      payment_onhold_data: {
        type: Sequelize.TEXT,
      },
      payment_onhold_note: {
        type: Sequelize.TEXT,
      },
      payment_onhold_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      total_onhold_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      status: {
        type: Sequelize.INTEGER,
      },
      status_note: {
        type: Sequelize.TEXT,
      },
      expert_approval_time: {
        type: Sequelize.DATE,
      },
      expert_approval_note: {
        type: Sequelize.TEXT,
      },
      expert_approval_status: {
        type: Sequelize.STRING(20),
      },
      confirmed_starttime: {
        type: Sequelize.DATE,
      },
      confirmed_endtime: {
        type: Sequelize.DATE,
      },
      act_starttime: {
        type: Sequelize.DATE,
      },
      act_endtime: {
        type: Sequelize.DATE,
      },
      act_duration: {
        type: Sequelize.INTEGER,
      },
      act_session_info: {
        type: Sequelize.TEXT,
      },
      act_total_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },

      payment_final_time: {
        type: Sequelize.DATE,
      },
      total_payment_final_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      payment_final_status: {
        type: Sequelize.STRING(20),
      },
      payment_final_data: {
        type: Sequelize.TEXT,
      },
      payment_final_note: {
        type: Sequelize.TEXT,
      },
      comission_fee_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      referral_fee_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      payment_gateway_fee: {
        type: Sequelize.DECIMAL(10, 2),
      },
      refund_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      Refund_fee: {
        type: Sequelize.DECIMAL(10, 2),
      },
      refund_status: {
        type: Sequelize.INTEGER,
      },
      refund_time: {
        type: Sequelize.DATE,
      },
      refund_note: {
        type: Sequelize.TEXT,
      },
      expert_earning_amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      created_by: {
        type: Sequelize.STRING(20),
      },
      update_by: {
        type: Sequelize.STRING(20),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('orders');
  },
};
