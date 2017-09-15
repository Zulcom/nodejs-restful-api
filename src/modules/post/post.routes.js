import { Router } from 'express';
import { createPost, getPost, getPosts, updatePost, deletePost, favoritePost } from './post.controllers';
import { authJwt } from '../../services/auth.services';
import { createPostValidator, updatePostValidator } from './post.validations';
import validate from 'express-validation';

const routes = new Router();

routes.post('/', authJwt, validate(createPostValidator), createPost);
routes.get('/:id', authJwt, getPost);
routes.get('/', authJwt, getPosts);
routes.patch('/:id', authJwt, validate(updatePostValidator), updatePost);
routes.delete('/:id', authJwt, deletePost);
routes.delete('/:id/favorite', authJwt, favoritePost);

export default routes;
