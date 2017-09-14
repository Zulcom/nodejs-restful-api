import Joi from 'joi';

export const createPostValidator = {
  body: {
    title: Joi.string().min(3).required(),
    text: Joi.string().min(10).required()
  }
};
