import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// apply middlewares
export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());

  if (isDev) {
    app.use(morgan('dev'));
  }
};
