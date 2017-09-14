import { Router } from 'express';
import { createPost } from './post.controllers';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.post('/', authJwt, createPost);

export default routes;
