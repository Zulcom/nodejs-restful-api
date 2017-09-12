import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.services';

// modules routes
export default app => {
  app.use('/api/v1/users', userRoutes);
  app.get('/hello', authJwt, (req, res) => {
    res.send('hello guys');
  });
};
