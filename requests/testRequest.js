const { throwValidations } = require('./baseValidator.js');
const { check } = require('express-validator');

const requestValidations = [
    check('name').not().isEmpty().trim().escape().exists(),
        check('email')
            .bail()
            .isEmail().withMessage('email format error')
            .exists().withMessage('email not found')
            .normalizeEmail(),
        check('password').isLength({ min: 5 }),
        check('notifyOnReply').toBoolean()
]

exports.finalValidations = [
    ...requestValidations,
    throwValidations
];


