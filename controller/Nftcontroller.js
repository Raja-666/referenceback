const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Nftcreate = require('../models/NftSchema');

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
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
}).single("NftImage");

const handlecreateNft = async (req, res) => {
    try {
     
      
      const { nftName,uploadfile, supply, description, link, traits , collection, address } = req.body; // Match the property names with frontend
  
      const sameNftName = await Nftcreate.findOne({ nftName: nftName });
      if (sameNftName) {
        return res.status(400).json({
          message: 'Nft Name Already Exists',
        });
      } else {
        const createNft = new Nftcreate({
          uploadfile,
          nftName,
          supply,
          description,
          link,
          address,
          traits:JSON.parse(traits) ,
           collection
        });

        await createNft.save();

        res.status(200).json({ success: true, message: 'NFT created successfully' });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error: ' + error.message });
    }
  };
  
  module.exports = { handlecreateNft };