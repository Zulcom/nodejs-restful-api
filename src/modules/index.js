import userRoutes from './users/user.routes';

// modules routes
export default app => {
  app.use('/api/v1/users', userRoutes);
};
