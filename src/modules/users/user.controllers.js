import HTTPStatus from 'http-status';

import User from './user.model';

/**
 * sigup user
 * method: POST /api/v1/users/sigup
 * req: body user info
 * res: 201 or 400
 */
export async function sigup (req, res) {
  try {
    const user = await User.create(req.body);

    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (err) {
    console.log(err);
    return res.status(HTTPStatus.BAD_REQUEST).json(err);
  }
};

/**
 * login user
 * method: POST /api/v1/users/login
 * req: body user info
 * res: 201 or 400
 */
export function login (req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

  return next();
};
