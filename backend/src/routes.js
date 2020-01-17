import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './controllers/UserController';
import auth from './services/auth';

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send('Hello World!!');
});
routes.post("/user", UserController.create);
routes.post("/user/auth", UserController.authenticate);

// routes.post(
//   "/user/files",
//   auth.authorize,
//   multer(multerConfig).single('file'),
// );

module.exports = routes;