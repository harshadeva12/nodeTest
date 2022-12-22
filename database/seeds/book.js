const Book = require("../../models/Book.js");

const records = [
    {
        name:'Book 01',
    },
    {
        name:'Book 02',
    },
    {
        name:'Book 03',
    }
];

// Function call
Book.insertMany(records).then(function(){
    console.log("Books inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});