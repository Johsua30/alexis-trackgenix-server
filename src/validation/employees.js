import Joi from 'joi';

const createEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    phone: Joi.string().min(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    active: Joi.boolean(),
  });
  const validation = Schema.validate(req.body);
  if (validation.err) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      err: validation.err.details[0],
    });
  }
  return next();
};

const updateEmployeeValidation = (req, res, next) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    phone: Joi.string().min(10),
    email: Joi.string().email(),
    password: Joi.string().min(8).alphanum().required(),
    active: Joi.boolean(),
    projects: Joi.array().items(
      Joi.string().alphanum().length(24).required(),
    ),
    timeSheets: Joi.array().items(
      Joi.string().alphanum().length(24).required(),
    ),
  });
  const validation = Schema.validate(req.body);
  if (validation.err) {
    return res.status(400).json({
      message: 'There was an error during the validation process',
      err: validation.err.details[0],
    });
  }
  return next();
};

export default {
  createEmployeeValidation,
  updateEmployeeValidation,
};
