const Category = require("../models/Category");
const random_name = require('node-random-name');
const { validationResult } = require('express-validator');

exports.storeCategory = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const category = await new Category({ name: random_name() }).save();
    res.send(category);
    // return res.status(400).json({
    //     message: "Success message format",
    //   })
}