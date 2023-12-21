import express from 'express';
import * as path from 'path';
import * as process from "process";
import cors from 'cors';
import { databaseRouter } from './database.router';
import bodyParser from 'body-parser';

const app = express();
require('dotenv').config();

app.use(cors({ origin: '*', credentials: true }));
//app.use(fileUpload);
app.use(bodyParser.json());

const sqlite3 = require('sqlite3').verbose();
export const db = new sqlite3.Database(process.env.DATABASE_URL);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(databaseRouter);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backends-dbp-backend!' });
});

const port = process.env.PORT || 1010;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
