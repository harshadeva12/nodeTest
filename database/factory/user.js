const User = require('../../models/User');
const {mongoose} = require("../connection.js");

fakery.fake('user', User, {
    firstName: fakery.g.name(),
    lastName: fakery.g.surname(),
    password: '123456',
    username: 'faker',
    city: 'kohuwala',
    // email: fakery.lazy(function(attrs) {
    //     // this will return john@example.com
    //     return attrs.name + '@example.com';
    // })
});