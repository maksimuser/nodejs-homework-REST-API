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
  });

  const validation = schemaCreate.validate(req.body);

  if (validation.error) {
    const [
      {
        context: { label },
      },
    ] = validation.error.details;

    return next(
      res.status(400).json({ message: `missing required '${label}' field` }),
    );
  } else {
    next();
  }
};

const validatePatchContact = (req, res, next) => {
  const schemaPatch = Joi.object({
    name: Joi.string().alphanum().min(2).max(15).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .optional(),
    phone: Joi.string().alphanum().min(10).max(13).optional(),
  })
  .xor('name', 'email', 'phone');

  const validation = schemaPatch.validate(req.body);

  if (validation.error) {
    const [
      {
        context: { peersWithLabels },
        message,
      },
    ] = validation.error.details;
    console.log(peersWithLabels);
    return next(
      res.status(400).json({
        message: `missing required ${message.replace(/"/g, '')} field`,
      }),
    );
  } else {
    next();
  }
};

module.exports = { validateCreateContact, validatePatchContact };
