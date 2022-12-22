const userRequest = require("./authGuardRequest");
const loginRequest = require("./loginRequest");
const testRequest = require("./testRequest");


exports.userRequest = userRequest.finalValidations;
exports.loginRequest = loginRequest.finalValidations;
exports.testRequest = testRequest.finalValidations;

// const validationFiles =
// [
//     'authGuardRequest'
// ] 

// validationFiles.forEach((item)=>{
//     exports[item] = require('./'+item).finalValidations;
// });