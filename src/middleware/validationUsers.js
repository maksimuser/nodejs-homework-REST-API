const Joi = require('joi');

const validateAuth = (req, res, next) => {
  const schemaAuth = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });

  const validation = schemaAuth.validate(req.body);

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

const validateSubscription = (req, res, next) => {
  const schemaSubscription = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  });

  const validation = schemaSubscription.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;

    return res.status(400).json({
      message: `missing required '${message.replace(/"/g, '')}' field`,
    });
  } else {
    next();
  }
};

module.exports = { validateAuth, validateSubscription };
