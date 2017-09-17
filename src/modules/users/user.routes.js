import { Router } from 'express';
import { authLocal } from '../../services/auth.services';
import validate from 'express-validation';
import * as userControllers from './user.controllers';
import * as validator from './user.validator';

const routes = new Router();

routes.post('/sigup', validate(validator.sigup), userControllers.sigup);
routes.post('/login', validate(validator.login), authLocal, userControllers.login);

export default routes;
