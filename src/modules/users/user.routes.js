import { Router } from 'express';

import * as userControllers from './user.controllers';

const routes = new Router();

routes.post('/sigup', userControllers.sigup);

export default routes;
