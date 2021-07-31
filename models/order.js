const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        foreignKey: 'idCustomer',
        as: 'order_has_costumer',
      });

      this.belongsTo(models.topic, {
        foreignKey: 'idTopic',
        as: 'order_has_topic',
      });

      this.belongsTo(models.category, {
        foreignKey: 'idCategory',
        as: 'order_has_category',
      });

      this.belongsTo(models.expert_listing, {
        foreignKey: 'idExpertListing',
        as: 'order_has_ExpertListing',
      });
    }
  }
  order.init(
    {
      idExpert: DataTypes.INTEGER,
      idExpertListing: DataTypes.INTEGER,
      idCustomer: DataTypes.INTEGER,
      idTopic: DataTypes.INTEGER,
      idCategory: DataTypes.INTEGER,
      fname: DataTypes.STRING(50),
      lname: DataTypes.STRING(50),
      book_starttime1: DataTypes.DATE,
      book_endtime1: DataTypes.DATE,
      book_starttime2: DataTypes.DATE,
      book_endtime2: DataTypes.DATE,
      book_starttime3: DataTypes.DATE,
      book_endtime3: DataTypes.DATE,
      book_duration: DataTypes.INTEGER,
      expert_rate: DataTypes.INTEGER,
      currency: DataTypes.STRING(5),
      title_content: DataTypes.STRING(50),
      topic_name: DataTypes.STRING(50),
      categoyry_name: DataTypes.STRING(50),
      approval_expert: DataTypes.DATE,
      approval_expert_note: DataTypes.STRING(100),
      payment_onhold_time: DataTypes.DATE,
      payment_onhold_duedate: DataTypes.DATE,
      payment_method: DataTypes.STRING(50),
      payment_onhold_status: DataTypes.STRING(20),
      payment_onhold_data: DataTypes.TEXT,
      payment_onhold_note: DataTypes.TEXT,
      payment_onhold_amount: DataTypes.DECIMAL(10, 2),
      total_onhold_amount: DataTypes.DECIMAL(10, 2),
      status: DataTypes.INTEGER,
      status_note: DataTypes.TEXT,
      expert_approval_time: DataTypes.DATE,
      expert_approval_note: DataTypes.TEXT,
      expert_approval_status: DataTypes.STRING(20),
      confirmed_starttime: DataTypes.DATE,
      confirmed_endtime: DataTypes.DATE,
      act_starttime: DataTypes.DATE,
      act_endtime: DataTypes.DATE,
      act_duration: DataTypes.INTEGER,
      act_session_info: DataTypes.TEXT,
      act_total_amount: DataTypes.DECIMAL(10, 2),
      payment_final_time: DataTypes.DATE,
      total_payment_final_amount: DataTypes.DECIMAL(10, 2),
      payment_final_status: DataTypes.STRING(20),
      payment_final_data: DataTypes.TEXT,
      payment_final_note: DataTypes.TEXT,
      comission_fee_amount: DataTypes.DECIMAL(10, 2),
      referral_fee_amount: DataTypes.DECIMAL(10, 2),
      payment_gateway_fee: DataTypes.DECIMAL(10, 2),
      refund_amount: DataTypes.DECIMAL(10, 2),
      Refund_fee: DataTypes.DECIMAL(10, 2),
      refund_status: DataTypes.INTEGER,
      refund_time: DataTypes.DATE,
      refund_note: DataTypes.TEXT,
      expert_earning_amount: DataTypes.DECIMAL(10, 2),
      created_by: DataTypes.STRING(20),
      updated_by: DataTypes.STRING(20),
    },
    {
      sequelize,
      modelName: 'order',
    }
  );
  return order;
};
