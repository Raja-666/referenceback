var express = require('express');
var router = express.Router();

const NftController = require('../controller/Nftcontroller');


var multer = require('multer');
var upload = multer({ dest: 'uploads/' });


router.post('/Nftcreate',  upload.any(), NftController.handlecreateNft);



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource userr');
});

module.exports = router;