import Joi from 'joi';

export const passwordRegExp = /^(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

// sigup request validator schema with joi
export const sigup = {
  body: {
    email: Joi.string().email().required(),
    userName: Joi.string().max(25).required(),
    password: Joi.string().min(6).regex(passwordRegExp).required()
  }
};

export const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }
};
