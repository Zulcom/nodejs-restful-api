import express from 'express';
import middlewares from './config/middlewares';
import constants from './config/constants';
import './config/database';
import apiRoutes from './modules';

// create app
const app = express();

// app middlewares apply
middlewares(app);

// app routes
app.get('/', (req, res) => {
  res.send('Hello Guys!');
});

apiRoutes(app);

// server runing
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
