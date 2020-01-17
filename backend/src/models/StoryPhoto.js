import { Model, DataTypes } from 'sequelize';

export default class StoryPhoto extends Model {
  static init(sequelize) {
    super.init({
      type: {
        type: DataTypes.ENUM('photo', 'video'),
        defaultValue: 'photo',
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
    }, {
      sequelize
    })
  }
};