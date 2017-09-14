import userRoutes from './users/user.routes';
import postRoutes from './post/post.routes';

// modules routes
export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/posts', postRoutes);
};
