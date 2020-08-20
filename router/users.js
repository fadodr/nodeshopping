const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller');

router.post('/signup', usercontroller.signup_user);
router.post('/login', usercontroller.login_user);

module.exports = router