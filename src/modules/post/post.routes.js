import { Router } from 'express';

import { createPost } from './post.controllers';

const routes = new Router();

routes.post('/', createPost);

export default routes;
