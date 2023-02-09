import Joi from 'joi';

export const ILoginUser = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  
  password: Joi.string()
    .min(3)
    .required(),
});

export const IRegisterUser = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  
  password: Joi.string()
    .min(3)
    .required(),

  email: Joi.string()
    .email()
    .required(),
})

export const IRegisterWorker = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),

  email: Joi.string()
    .email()
    .required(),

  name: Joi.object({
    first: Joi.string().required(),
    last: Joi.string().required()
  }).required(),

  phone: Joi.string()
})