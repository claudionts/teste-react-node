import Validator from '../services/Validator';
import httpStatus from 'http-status-codes';
import Auth from '../services/auth';
import User from '../models/User';
import Upload from '../services/upload';

export default {
  async create(req, res) {
    try {
      const {
        email = undefined,
        password = undefined,
        name = undefined,
        photo = null
      } = req.body;
      const token = await Auth.generateToken({ id: user.id, email: user.email });
      const valid = new Validator();
      valid.isEmail(email, 'Email inválido');
      valid.isRequired(password, 'Insira o Password');
      valid.isRequired(name, 'Insira o nome');
  
      if (!valid.isValid())
        return res.status(httpStatus.UNPROCESSABLE_ENTITY)
          .send({ error: true, token: null, data: valid.getError() })
          .end();
  
      let newUser = await User.findOrCreate({
                              where: { email },
                              defaults: { email, password, name, photo, token },
                              attributes: { exclude:['password'] }
                            });
  
      delete newUser[0].dataValues['password'];

      return res.status(httpStatus.CREATED)
        .send({
          error: false,
          token: newUser[0].token,
          data: newUser[0] })
        .end();
    } catch (error) {
      return res.status(httpStatus.CONFLICT)
        .send({
          error: true,
          token: null,
          data: error
        })
        .end();
    }
  },

  async authenticate(req, res) {
    const { email = undefined, password = undefined } = req.body;

    const valid = new Validator();
    valid.isEmail(email, 'Email inválido');
    valid.isRequired(password, 'Insira o Password');
    if (!valid.isValid())
        return res.status(httpStatus.UNPROCESSABLE_ENTITY)
          .send({ error: true, token: null, data: valid.getError() })
          .end();
  
    let user = await User.findOne({
                      where: { email }
                    });
    
    if (!(await user.comparePass(password)))
      return res.status(httpStatus.UNAUTHORIZED)
        .send({ error: true, token: null, data: { message: 'Senha inválida!' }})
        .end();
    user.token = await Auth.generateToken({ id: user.id, email: user.email });
    delete user.dataValues["password"];
    return res.status(httpStatus.ACCEPTED)
      .send({
        error: false,
        token: user.token,
        data: user
      })
      .end();
  },

  async creteUserPhoto(req, res) {
    const valid = new Validator();
    valid.isRequired(req.files['user_photo'], 'Foto do usuário não encontrada!');
    if (!valid.isValid())
        return res.status(httpStatus.UNPROCESSABLE_ENTITY)
          .send({ error: true, token: null, data: valid.getError() })
          .end();
    
    const { id } = await Auth.decodeToken(req.headers['x-access-token']);
    const currentUser = await User.findByPk(id);
    delete currentUser.dataValues['password'];

    if (!currentUser)
      return res.status(HttpStatus.NOT_FOUND)
        .send({ error: true, token: null, data: { message: 'Usuário não encontrado' } })
        .end();
    
    if (currentUser.photo) {
      const { filename, fieldname } = req.files['user_photo'].shift();
      await Upload.deleteImage(fieldname, await currentUser.getPhotoName());
      currentUser.setDataValue('photo',filename);
      await currentUser.save();
    }

    res.status(httpStatus.OK)
      .send({
        error: false,
        token: currentUser.token,
        data: currentUser
      })
      .end(); 
  },
};