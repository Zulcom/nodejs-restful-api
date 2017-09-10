import { Router } from 'express';
import validate from 'express-validation';
import { sigup } from './user.validator';
// import validator from './user.validator';

import * as userControllers from './user.controllers';

const routes = new Router();

routes.post('/sigup', validate(sigup), userControllers.sigup);

export default routes;
