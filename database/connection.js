const mongoose = require('mongoose')
const connectionString = "mongodb+srv://harsha:harsha@cluster0.nrbxo4q.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));
const connection = mongoose.connection
// connection.once('open', _ => {
//     console.log('Database connected:')
// })

// connection.on('error', err => {
//     console.error('connection error:', err)
// })

module.exports = connection;
module.exports = mongoose;