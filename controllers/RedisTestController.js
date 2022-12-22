const redisConnection = require('../redisClientConnection.js');

// test redis server
exports.test = async (req, res) => {
    await redisConnection.connect();
    await redisConnection.setEx('foo', 3000, 'bar');
    // redisConnection.get('foo', function (err, res) {
    //     console.log(res.toString()); 
    // });

    await redisConnection.disconnect();
    return res.send('finished');
}

// Retrieving a string value from Redis if it already exists for this key - Redis cache example 
exports.testKey = async (req, res) => {
    await redisConnection.connect();
    let value = await redisConnection.get('users');
    console.log(value);
    if(value == null){
        await redisConnection.setEx('users', 600,'nimal');
    }
    await redisConnection.disconnect();
    res.send('ddf');
}



    // Retrieving a string value from Redis if it already exists for this key - Redis cache example
// redisConnection.get('myStringKey', (err, value) => {
//   if (value) {
//   console.log(`The value associated with this key is:${value}`)
//   }
//   else {
//   // Storing a simple string in the Redis store
//   redisConnection.set('myStringKey', 'LogRocket Redis Tutorial');
//   }
// });