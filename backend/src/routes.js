import express from 'express';
import multer from 'multer';
import multerStart from './config/multer';
import UserController from './controllers/UserController';
import auth from './services/auth';

const routes = express.Router();
const user_photo_field = [{ name: 'user_photo', maxCount: 1 }];

routes.get('/', (req, res) => {
  res.send('Hello World!!');
});
routes.post('/user', UserController.create);
routes.post('/user/auth', UserController.authenticate);
routes.post(
  '/user/photo',
  auth.authorize,
  multerStart(user_photo_field),
  UserController.creteUserPhoto);
// routes.post(
//   "/user/files",
//   auth.authorize,
//   multer(multerConfig).single('file'),
// );

module.exports = routes;