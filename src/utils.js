import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/portadas`);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${Date.now()}-${fileName}`);
  }
});

const uploader = multer({
  storage, onError: (err, next) => {
    console.log(err);
    next();
  }
})

export { __dirname, uploader };
