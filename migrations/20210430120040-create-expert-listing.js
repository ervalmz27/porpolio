module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expert_listings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idexpert: {
        type: Sequelize.INTEGER,
      },
      idCustomer: {
        type: Sequelize.INTEGER,
      },
      idTopic: {
        type: Sequelize.INTEGER,
      },
      idcategory: {
        type: Sequelize.INTEGER,
      },
      categoryname: {
        type: Sequelize.STRING(50),
      },
      topicname: {
        type: Sequelize.STRING(50),
      },
      tags: {
        type: Sequelize.TEXT,
      },
      listing_image: {
        type: Sequelize.TEXT,
      },
      title_content: {
        type: Sequelize.STRING(50),
      },
      content_desc: {
        type: Sequelize.TEXT,
      },
      avg_rating: {
        type: Sequelize.DECIMAL(4, 1),
      },
      total_call: {
        type: Sequelize.INTEGER,
      },
      is_toprated: {
        type: Sequelize.BOOLEAN,
      },
      top_review: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      expert_name: {
        type: Sequelize.STRING(50),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_by: {
        type: Sequelize.STRING(50),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      created_by: {
        type: Sequelize.STRING(50),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('expert_listings');
  },
};
