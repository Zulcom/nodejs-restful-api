import express from 'express';
import constants from './config/constants';
import middlewares from './config/middlewares';
import apiRoutes from './modules';
import './config/database';

// create app
const app = express();

// middlewares apply
middlewares(app);

// app home test routes
app.get('/', (req, res) => {
  res.send('Hello Guys!');
});

// routes apply
apiRoutes(app);

// server runing
app.listen(constants.PORT, err => {
  if (err) throw err;
  console.log(`
    ---
    Server runing in port: ${constants.PORT}
    ---
    Runing on ${process.env.NODE_ENV}
    ---
  `);
});
