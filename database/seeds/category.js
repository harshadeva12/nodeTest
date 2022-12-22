const Category = require("../../models/Category.js");

const records = [
    {
        name:'Product 01',
    },
    {
        name:'Product 02',
    },
    {
        name:'Product 03',
    }
];

Category.insertMany(records).then(function(){
    console.log("Category inserted")  // Success
}).catch(function(error){
    console.log(error)    // Failure
});