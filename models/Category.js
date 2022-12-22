const {mongoose} = require("../database/connection.js");

const tableSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model("Category", tableSchema);
