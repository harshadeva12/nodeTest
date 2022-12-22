const { throwValidations } = require('./baseValidator.js');
const { check } = require('express-validator');

const requestValidations = [
    check('username').not().isEmpty().trim().escape().exists(),
    check('password').exists().isLength({ min: 5 })
]

exports.finalValidations = [
    ...requestValidations,
    throwValidations
];


