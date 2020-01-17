'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('story_photo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false,
      },
      type: {
        type: Sequelize.ENUM('photo', 'video'),
        defaultValue: 'photo',
        allowNull: false
      },
      length: {
        type: Sequelize.INTEGER,
        defaultValue: 3,
        allowNull: false
      },
      src: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preview: {
        type: Sequelize.STRING,
        allowNull: true
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      seen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
