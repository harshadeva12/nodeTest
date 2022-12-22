const { throwValidations } = require('./baseValidator.js');
const { check } = require('express-validator');

const requestValidations = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!')
        .bail(),
]

exports.finalValidations = [
    ...requestValidations,
    throwValidations
];


