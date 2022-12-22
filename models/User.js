const {mongoose} = require("../database/connection.js");

const tableSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password:String,
    username:String,
    city: String,
});

module.exports = mongoose.model("User", tableSchema);
