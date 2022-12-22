const Book = require("../models/Book");
const { validationResult } = require('express-validator');
const { connection } = require("mongoose");
const User = require("../models/User");

exports.home = async (req, res) => {
    res.send('Working');
    // res.sendFile(__dirname + '/../views/index.html')
};

exports.getObject = async (req, res) => {
    res.json({
        name:'test',
        age:4
    });
};

exports.getString = async (req, res) => {
    res.send('Strings');
};

exports.getNull = async (req, res) => {
    res.send(null);
};

exports.checkType = async (req, res) => {
    res.send(req.body);
};

exports.specificField = async (req, res) => {
    // let query = Book.find({}).select('name -_id');
    // query.exec(function (err, someValue) {
    //     if (err) return console.log(err);
    //     res.send(someValue);
    // });

    const query = Book.find({}).select('name -_id');
    query.exec(function (err, someValue) {
        if (err) return console.log(err);
        res.send(someValue);
    });
};

exports.validationTest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('validation test pass');
    res.send(req.body);
};

exports.testTransactions = async (req, res) => {
    const session = await connection.startSession();
    try {
        session.startTransaction()
        const user = await User.create([
            {
                firstName: 'Van Helsing'
            }
        ], { session });

        await Book.create([
            {
                name: 'Transylvania',
                user_id: user.idd
            }
        ], { session });

        await session.commitTransaction();
        res.send(user);
        
    } catch (error) {
        console.log('error');
        await session.abortTransaction();
        res.send(error);
    }
    session.endSession();
}