import { Router } from 'express';
import { authJwt } from '../../services/auth.services';
import validate from 'express-validation';
import * as postControllers from './post.controllers';
import * as validatior from './post.validatior';

const routes = new Router();

routes.post('/', authJwt, validate(validatior.createPost), postControllers.createPost);
routes.get('/:id', authJwt, postControllers.getPost);
routes.get('/', authJwt, postControllers.getPosts);
routes.patch('/:id', authJwt, validate(validatior.updatePost), postControllers.updatePost);
routes.delete('/:id', authJwt, postControllers.deletePost);
routes.post('/:id/favorite', authJwt, postControllers.favoritePost);

export default routes;
