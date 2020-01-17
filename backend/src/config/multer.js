import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default (fieldsObj) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        switch(file.fieldname) {
          case 'user_photo':
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'user_photo'));
            break;
          case 'story_photo':
            cb(null, path.resolve(__dirname, '..', '..' ,'tmp', 'story_photo'));
            break;
          default:
            break;
        }
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(4, (err, hash) => {
          if (err) cb(err);
          file.key = `${Date.now()}-${hash.toString('hex')}-${file.originalname}`;
          cb(null, file.key);
        });
      }
    })
  }).fields(fieldsObj);
};