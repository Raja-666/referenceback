var express = require('express');
var router = express.Router();

const walletController = require('../controller/Walletcontroller');

router.post('/connectedusers', walletController.handleWalletaddress);
router.post('/connectuserdetails', walletController.handleWalletaddress);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
