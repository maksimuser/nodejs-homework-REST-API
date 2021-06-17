const Joi = require('joi');

const validateCreateContact = (req, res, next) => {
  const schemaCreate = Joi.object({
    name: Joi.string().alphanum().min(2).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string().alphanum().min(10).max(13).required(),
    favorite: Joi.boolean().optional(),
  });

  const validation = schemaCreate.validate(req.body);

  if (validation.error) {
    const [{ context }] = validation.error.details;
    const { label } = context;
    return res
      .status(400)
      .json({ message: `missing required '${label}' field` });
  } else {
    next();
  }
};

const validateUpdateContact = (req, res, next) => {
  const schemaPatch = Joi.object({
    name: Joi.string().alphanum().min(2).max(15).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .optional(),
    phone: Joi.string().alphanum().min(10).max(13).optional(),
  }).or('name', 'email', 'phone');

  const validation = schemaPatch.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return res.status(400).json({
      message: `missing required ${message.replace(/"/g, '')} field`,
    });
  } else {
    next();
  }
};

const validateStatusContact = (req, res, next) => {
  const schemaStatus = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validation = schemaStatus.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return res.status(400).json({
      message: `missing required ${message.replace(/"/g, '')} field`,
    });
  } else {
    next();
  }
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateStatusContact,
};
