import Joi from 'joi';

export const createPost = {
  body: {
    title: Joi.string().min(3).required(),
    text: Joi.string().min(10).required()
  }
};

export const updatePost = {
  body: {
    title: Joi.string().min(3),
    text: Joi.string().min(10)
  }
};
