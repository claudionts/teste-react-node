import { Model, DataTypes } from 'sequelize';

export default class StoryPhoto extends Model {
  static init(sequelize) {
    super.init({

    }, {
      sequelize
    })
  }
};