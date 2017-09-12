import { Router } from 'express';
import validate from 'express-validation';
import { sigup } from './user.validator';
import { authLocal } from '../../services/auth.services';

import * as userControllers from './user.controllers';

const routes = new Router();

routes.post('/sigup', validate(sigup), userControllers.sigup);
routes.post('/login', authLocal, userControllers.login);

export default routes;
