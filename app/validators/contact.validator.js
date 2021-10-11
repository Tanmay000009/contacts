const { body, validationResult } = require('express-validator')
const contactValidationRules = () => {
  return [
    // contactname cannot be null
    body('name').isLength({ min: 1 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  contactValidationRules,
  validate,
}