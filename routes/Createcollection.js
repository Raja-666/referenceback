const express = require('express');
const router = express.Router();
const CreateController = require('../controller/Createcontroller');

const path = require('path');
const fs = require('fs');


var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/Createcollection',  CreateController.handleCreateCollection); // upload.single('logo'),
router.post('/CollectionList', CreateController.handleListCollection);

router.post('/get-collection', CreateController.handleGetCollections); // home
router.post('/view-collection', CreateController.handleViewCollections); // col-page


module.exports = router;

