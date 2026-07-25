const { check, validationResult } = require('express-validator');

const validateLead = [
  check('fullName', 'Full Name is required').notEmpty().trim(),
  check('email', 'Valid business email is required').isEmail().normalizeEmail(),
  check('company', 'Company Name is required').notEmpty().trim(),
  check('phone', 'Phone Number is required').notEmpty().trim(),
  check('service', 'Service selection is required').notEmpty().trim(),
  check('budget', 'Estimated budget is required').notEmpty().trim(),
  check('description', 'Project description is required').notEmpty().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = { validateLead };
