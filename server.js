const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8081;
require('./cron/crone.js');
// require('./database/connection.js');
const cors = require('cors');
const whitelist = ['http://127.0.0.1'];
const fakery = require('mongoose-fakery');

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error())
//     }
//   }
// }

// const corsOptions =  {
//  origin: ['https://www.section.io', 'https://www.google.com/']
// }

app.use(cors());

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// to accept json row data request
app.use(express.json())

app.use(cookieParser());

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, function () {
    console.log('listening on ' + PORT);
});
}
else {
  console.log('APP IS ON DEVELOPMENT ENVIRONMENT');
}


const routes = require('./routes/api.js');
// const {connection} = require("./database/connection.js");
const Category = require('./models/Category.js');
const User = require('./models/User.js');

// fakery.fake('category',connection.model('Category'), {
//   name: fakery.g.name()
// });

// fakery.fake('user',connection.model('User'), {
//   firstName: fakery.g.name(),
//   lastName: fakery.g.name(),
//   password: fakery.g.name(),
//   username: fakery.g.name(),
//   city: fakery.g.name()
// });

// for (let i = 0; i < 10; i++) {
//   // const category = fakery.fake('category');
//   // new Category(category).save()
  
//   // const user = fakery.fake('user');
//   // new User(user).save()
// }




    
app.use('/', routes);

// async function fetchAll() {
//     // const res = fetch(`https://jsonplaceholder.typicode.com/posts/1`);
//     const length = 20;
//     const ids = Array.from(Array(length).keys()); // Array of ids
//     // const responses = Promise.all(
//     //     ids.map(async id => {
//     //         fetch(
//     //             `http://127.0.0.1:8000/api/product-custom?session_id=${id}`
//     //         ); // Send request for each id
//     //     })
//     // );

//     let endpoints = [];

//       const url = "http://127.0.0.1:8000/api/product-custom?session_id=";
//       ids.forEach((item)=>{
//         endpoints.push(url+item);
//       })
      
//       axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
//         (data) => console.log(data),
//       );

//     // console.log(responses);
// }

// setInterval(() => {
//     fetchAll();
// }, 20000);


// setInterval(() => {
//     fetchAll();
// }, 7000);

module.exports = app;