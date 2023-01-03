const Book = require("../models/Book");
const { validationResult } = require('express-validator');
const { connection } = require("mongoose");
const User = require("../models/User");
const Storage = require('node-storage');


exports.home = async (req, res) => {
    res.send('Working');
    // res.sendFile(__dirname + '/../views/index.html')
};


exports.getObject = async (req, res) => {
    res.json({
        name: 'test',
        age: 4
    });
};


exports.getString = async (req, res) => {
    res.send('Strings');
};

exports.getNull = async (req, res) => {
    res.send(null);
};

exports.checkType = async (req, res) => {
    res.send(req.body);
};

exports.specificField = async (req, res) => {
    // let query = Book.find({}).select('name -_id');
    // query.exec(function (err, someValue) {
    //     if (err) return console.log(err);
    //     res.send(someValue);
    // });

    const query = Book.find({}).select('name -_id');
    query.exec(function (err, someValue) {
        if (err) return console.log(err);
        res.send(someValue);
    });
};

exports.validationTest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('validation test pass');
    res.send(req.body);
};

exports.testTransactions = async (req, res) => {
    const session = await connection.startSession();
    try {
        session.startTransaction()
        const user = await User.create([
            {
                firstName: 'Van Helsing'
            }
        ], { session });

        await Book.create([
            {
                name: 'Transylvania',
                user_id: user.idd
            }
        ], { session });

        await session.commitTransaction();
        res.send(user);

    } catch (error) {
        console.log('error');
        await session.abortTransaction();
        res.send(error);
    }
    session.endSession();
}

exports.storageTest = async (req, res) => {
    // this will synchronously create storage file and any necessary directories
    // or just load an existing file
    const store = new Storage('/storage/public');

    // persistence to disk is queued on every put()
    store.put('hello', 'world');

    // storage object is kept in memory for quick access
    store.get('hello'); // 'world'

    // for convenience, you can use dot notation for accessing objects when doing get/put
    store.get('nested.value'); // undefined

    // here, 'nested' object is created, but only if it didn't previously exist,
    // in which case 'numbers' key is just added to the object
    store.put('nested.numbers', [1, 2, 3]);
    store.get('nested.numbers'); // [1, 2, 3]

    // throws 'nested.numbers is not an object' error
    store.put('nested.numbers.primes', [7, 11, 13]);

    store.put('nested.primes', [7, 11, 13]);
    store.get('nested'); // { numbers: [1, 2, 3], primes: [7, 11, 13] }

    store.put('deeply.nested', { object: { hello: 'world' } });
    store.get('deeply.nested.object.hello'); // 'world'
    store.get('deeply.nested').object.hello; // 'world'

    // remove also queues storage object to be persisted to disk
    store.remove('deeply.nested.object');
    store.get('deeply.nested.object.hello'); // undefined
    store.get('deeply.nested.object'); // undefined
    store.get('deeply.nested'); // {}
}
