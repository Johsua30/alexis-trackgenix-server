import Joi from 'joi';

const createAdminValidations = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid name, it must contain only letters',
      })
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid last name, it must contain only letters',
      })
      .required(),
    email: Joi.string().email().message('Invalid email format').required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern':
          'Invalid password, it must contain both letters and numbers',
      })
      .required(),
    active: Joi.boolean().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const updateAdminValidations = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid name, it must contain more than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid name, it must contain only letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        'string.min': 'Invalid last name, it must contain more than 3 letters',
        'string.max':
          'Invalid last name, it must not contain more than 50 letters',
        'string.pattern': 'Invalid last name, it must contain only letters',
      }),
    email: Joi.string().email().message('Invalid email format'),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern':
          'Invalid password, it must contain both letters and numbers',
      }),
    active: Joi.boolean(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: validation.error.details[0].message,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  createAdminValidations,
  updateAdminValidations,
};
