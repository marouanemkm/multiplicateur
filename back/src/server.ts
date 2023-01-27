console.log('Hello !');

import express, { RequestHandler } from 'express';
import serveIndex from 'serve-index';
import { api } from './api';

const app = express();
const port = 3000;

const accessLog: RequestHandler = (req, res, next) => {
  console.log('req: ', req.url);
  next();
};

app.use(accessLog);
app.use('/api', api);
app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.listen(port, () => {
  console.log(`Example app listing on port ${port}`);
});
