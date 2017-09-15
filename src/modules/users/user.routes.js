import { Router } from 'express';
import * as userControllers from './user.controllers';
import * as validator from './user.validator';
import validate from 'express-validation';
import { authLocal } from '../../services/auth.services';

const routes = new Router();

routes.post('/sigup', validate(validator.sigup), userControllers.sigup);
routes.post('/login', validate(validator.login), authLocal, userControllers.login);

export default routes;
