import { Router } from 'express';
import { createPost, getPost, getPosts, updatePost, deletePost } from './post.controllers';
import { authJwt } from '../../services/auth.services';
import { createPostValidator, updatePostValidator } from './post.validations';
import validate from 'express-validation';

const routes = new Router();

routes.post('/', authJwt, validate(createPostValidator), createPost);
routes.get('/:id', getPost);
routes.get('/', getPosts);
routes.patch('/:id', authJwt, validate(updatePostValidator), updatePost);
routes.delete('/:id', authJwt, deletePost);

export default routes;
