import { db } from './main';
import multer from 'multer';
import process from 'process';

export function GetRunPromise(query, params) {
  return new Promise((resolve, reject) => {

    db.all(query, params, (err) => {

      if(err) {

        // case error
        reject(err);
      }

      // "return" the result when the action finish
      resolve("Accepted");
    })
  })
}

export function GetAllPromise(query, params) {
  return new Promise((resolve, reject) => {

    db.all(query, params, (err, rows) => {

      if(err) {

        // case error
        reject(err);
      }

      // "return" the result when the action finish
      resolve(rows);
    })
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.Assets);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
