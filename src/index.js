import express from 'express';
import middlewares from './config/middlewares';
import constants from './config/constants';
import './config/database';

const app = express();

middlewares(app);

app.get('/', (req, res) => {
  res.send('Hello Guys!');
});

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      ---
      Server runing in port: ${constants.PORT}
      ---
      Runing on ${process.env.NODE_ENV}
      ---
    `);
  }
});
