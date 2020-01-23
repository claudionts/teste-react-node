import { Model, DataTypes } from 'sequelize';
import bcrypt from'bcrypt';

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      photo: DataTypes.STRING,
      token: DataTypes.STRING,
      password: DataTypes.STRING
    }, {
      sequelize
    });
    
    super.beforeUpdate(async user => user.photo = `https:localhost:3333/tmp/user_photo/${user.photo}`);
    super.beforeCreate(async user => user.password = await hashPassword(user.password));
  }

  async comparePass(clientPass){
    return await bcrypt.compare(clientPass, this.password);
  };

  getPhotoName() {
    return this.photo.split('user_photo/')[1];
  }
};