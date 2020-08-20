const express = require('express');
const router = express.Router();
const ordercontroller = require('../controller/ordercontroller');
const isauth = require('../middleware/isauth');

router.post('/addorder', ordercontroller.addorder);
router.get('/getorders', ordercontroller.getorders);
router.get('/getorder/:id',isauth, ordercontroller.getsingleorder);

module.exports = router;