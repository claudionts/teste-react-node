import fs from 'fs';
import path from 'path';

export default {
  async deleteImage(fieldName, name) {
    const dirPhoto = path.resolve(__dirname, '..', '..','tmp', fieldName, name);
    
    await fs.access(dirPhoto, (err) => {
      if (!err)
        fs.unlink(dirPhoto, err => {
          if (err) throw "Directory is not exists!";
        })
    })
  },
}