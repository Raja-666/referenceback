var express = require('express');
var router = express.Router();

const profileController = require('../controller/profilecontroller');


var multer = require('multer');
var upload = multer({ dest: 'uploads/' });


router.post('/updateProfile', upload.any(), profileController.handleUpdateProfile);
router.post('/getProfile', upload.any(), profileController.handleGetProfile);



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;