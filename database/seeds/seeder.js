const categories = require("./category")
const books = require("./book")

categories.seedDB;
books.seedDB;

console.log('seeder executing ...');