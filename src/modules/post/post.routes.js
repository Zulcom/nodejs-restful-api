import { Router } from 'express';
import * as postControllers from './post.controllers';
import { authJwt } from '../../services/auth.services';
import * as validatior from './post.validatior';
import validate from 'express-validation';

const routes = new Router();

routes.post('/', authJwt, validate(validatior.createPost), postControllers.createPost);
routes.get('/:id', authJwt, postControllers.getPost);
routes.get('/', authJwt, postControllers.getPosts);
routes.patch('/:id', authJwt, validate(validatior.updatePost), postControllers.updatePost);
routes.delete('/:id', authJwt, postControllers.deletePost);
routes.post('/:id/favorite', authJwt, postControllers.favoritePost);

export default routes;
