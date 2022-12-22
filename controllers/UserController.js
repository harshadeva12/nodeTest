const User = require("../models/User");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")

exports.store = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const hashed = await bcrypt.hash(req.body.password, 10);
        const passwordMatched = await bcrypt.compare(req.body.password, hashed);
        console.log(passwordMatched);

        const validatedData = {
            firstName : req.body.first_name,
            lastName : req.body.last_name,
            username : req.body.username,
            password : hashed,
            city:req.body.city
        }
        const user = await new User(validatedData).save();
        res.send(user);
    } catch (error) {
        console.log(error);
    }
};