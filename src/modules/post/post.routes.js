import { Router } from 'express';
import { createPost, getPost, getPosts } from './post.controllers';
import { authJwt } from '../../services/auth.services';
import { createPostValidator } from './post.validations';
import validate from 'express-validation';

const routes = new Router();

routes.post('/', authJwt, validate(createPostValidator), createPost);
routes.get('/:id', getPost);
routes.get('/', getPosts);

export default routes;
