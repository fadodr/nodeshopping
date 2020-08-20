const express = require('express');
const router = express.Router();
const cartcontroller = require('../controller/cartcontroller');
const isauth = require('../middleware/isauth');

router.post('/addcart',isauth, cartcontroller.addcart);
router.get('/getcarts',isauth, cartcontroller.getcarts );
router.get('/getcart/:id',isauth, cartcontroller.getsinglecart);

module.exports = router