const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Collection = require('../models/Schema');
const Nftcreate = require('../models/NftSchema');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (adjust as needed)
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).single("imageFile");


const handleCreateCollection = async (req, res) => {
  try {

    const { collectionName, description, collectionUrl, address, logo } = req.body;


    const sameCollectionName = await Collection.findOne({ collectionName: collectionName });
    if (sameCollectionName) {
      return res.status(400).json({
        message: "Collection Name Already Exists",
      });
    }

    // const sameImage = await Collection.findOne({ logo: filePath });
    // if (sameImage) {
    //   fs.unlinkSync(filePath); // Delete the duplicate image file
    //   return res.status(400).json({
    //     message: "Duplicate Image. Please choose a different image.",
    //   });
    // }

    const newCollection = new Collection({
      logo, // Save the path to the uploaded logo
      collectionName,
      description,
      collectionUrl,
      address
    });

    await newCollection.save();

    res.status(200).json({ success: true, message: 'Collection created successfully' });

  } catch (error) {
    res.status(400).json({ success: false, message: 'Err-: ' + error.message });
  }
};

const handleListCollection = async (req, res) => {
  try {

    const reqData = req.body;

    if (!reqData.address) {
      return res.json({ status: false, message: "Wallet address missing.." })
    }





    let pipepline = [
      {
        '$match': {
          'address': reqData.address
        }
      }, {
        '$project': {
          'collectionName': 1,
          'collectionUrl': 1,
          'logo': 1,
          'address': 1
        }
      }
    ]

    const colData = await Collection.aggregate(pipepline)

    res.status(200).json({ success: true, data: colData, message: 'Collection List' });


  } catch (error) {

  }
}


const handleGetCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ status: 1 }, { logo: 1, collectionName: 1 });
    res.status(200).json({ success: true, data: collections, message: 'Successfully get!!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, data: [], message: 'Internal server error' });
  }
};


const handleViewCollections = async (req, res) => {
  try {
    const reqData = req.body

    const Collections = await Collection.findOne({ _id: reqData.id }, {});

    const nftData = await Nftcreate.find({ collection: reqData.id }, {});


    var finalData = {}

    finalData['itemList'] = nftData
    finalData['rootData'] = Collections

    res.status(200).json({ success: true, data: finalData, message: 'Successfully get!!' });
  } catch (error) {
    console.error(error);
    console.log('fdfs', error)
    res.status(500).json({ success: false, data: {}, message: 'Err-' + error.message });
  }
};




module.exports = { handleCreateCollection, handleListCollection, handleGetCollections, handleViewCollections };