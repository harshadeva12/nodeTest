const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController.js');
const BookController = require('../controllers/BookController.js');
const CategoryController = require('../controllers/CategoryController.js');
const UserController = require('../controllers/UserController.js');
const AuthController = require('../controllers/AuthController.js');
const RedisTestController = require('../controllers/RedisTestController.js');
const { adminAuth, test } = require("../middleware/auth.js");
const validator = require('../requests/kernel');


router.get('/ping', (req, res) => {
    res.send('Pong!');
  });
  

router.get('/', TestController.home);
router.get('/type-check', TestController.checkType)
router.get('/get-object', TestController.getObject)
router.get('/get-string', TestController.getString)
router.get('/get-null', TestController.getNull)
router.get('/specific-field', TestController.specificField)
router.get('/validation-test',[ validator.testRequest ], TestController.validationTest)
router.post('/add-transaction', TestController.testTransactions)

router.post('/store-book', BookController.storeBook)
router.get('/read-name', BookController.readName)

router.get('/redis-test', RedisTestController.test)
router.get('/redis-test-key', RedisTestController.testKey)

router.post('/add-category', CategoryController.storeCategory)
router.post('/add-user', UserController.store)

router.post('/login', [validator.loginRequest], AuthController.login)
router.post('/auth-guarded', [adminAuth, test,validator.userRequest], AuthController.authGuarded)

module.exports = router;