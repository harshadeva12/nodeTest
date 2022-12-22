const Book = require("../models/Book");
const User = require("../models/User");
const Category = require("../models/Category");
const random_name = require('node-random-name');

exports.storeBook = async (req, res) => {
    const data = req.body;
    const category = await Category.findOne();
    const user = await new User({ firstName: data.firstName, lastName: data.lastName, city: "piliyandala" }).save();
    const book = await new Book({ userId: user._id, name: random_name(), categories: [category._id] }).save();
    res.send(book);
}

exports.readName = async (req, res) => {
    const book = await Book.
        findOne({ name: req.body.name }).
        populate('userId').
        populate('categories').
        exec();
    res.send(book);
}