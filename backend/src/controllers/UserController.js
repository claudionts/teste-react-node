import User from '../models/User';
import Validator from '../services/Validator';
import httpStatus from 'http-status-codes';
import Auth from '../services/auth';

export default {
  async create(req, res) {
    try {
      const {
        email = undefined,
        password = undefined,
        name = undefined,
        user_photo = null
      } = req.body;
  
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
                              defaults: { email, password, name, user_photo },
                              attributes: { exclude:['password'] }
                            });
  
      delete newUser[0].dataValues["password"];

      return res.status(httpStatus.CREATED)
        .send({
          error: false,
          token: await Auth.generateToken({ id: newUser.id, email: newUser.email }),
          data: newUser[0] }); 
    } catch (error) {
      return res.status(httpStatus.CONFLICT)
        .send({
          error: true,
          token: null,
          data: error
        })
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
    if (await !user.comparePass(password))
      return res.status(httpStatus.UNAUTHORIZED)
        .send({ error: true, token: null, data: { message: "Senha inválida!" }})
        .end();

    delete user.dataValues["password"];
    return res.status(httpStatus.ACCEPTED)
      .send({
        error: false,
        token: await Auth.generateToken({ id: user.id, email: user.email }),
        data: user
      });
  }
};