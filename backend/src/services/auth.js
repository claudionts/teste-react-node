import jwt from 'jsonwebtoken';

export default {
  generateToken: async (data) => await jwt.sign(data, 'teste', { expiresIn: '365d' }),

  decodeToken: async (token) => await jwt.verify(token, 'teste'),

  authorize: async (req, res, next) => {
    var token = req.query.token || req.headers['x-access-token'];
  
    if (!token)
      res.status(401).json({ message: 'Acesso Restrito' });
    else {
      await jwt.verify(token, 'teste', (error, decoded) => {
        if (error)
          res.status(401).json({ message: 'Token Invalid' });
        else
          next();
      });
    }
  }
}