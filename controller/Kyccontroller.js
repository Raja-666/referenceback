const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const KYCModel = require('../models/KycSchema');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploadkyc';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/[-T:.Z]/g, '');
    cb(null, formattedDate + '-' + file.originalname);
  },
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Validate file format
    const allowedFormats = ['jpg', 'jpeg', 'png'];
    const fileFormat = file.mimetype.split('/')[1];
    if (allowedFormats.includes(fileFormat)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only jpg, jpeg, and png are allowed.'));
    }
  },
  limits: {
    fileSize: 30 * 1024 * 1024, // Limit file size to 30MB
  },
});

// Middleware to handle file uploads
router.use(upload.fields([
  { name: 'frontSideProof', maxCount: 1 },
  { name: 'backSideProof', maxCount: 1 },
  { name: 'selfieProof', maxCount: 1 },
]));

const handleKyccontrol = async (req, res) => {
  try {
    const { frontSideProof, backSideProof, selfieProof, address, number, proofType } = req.body;

    if(Object.values(req.body).some((element) => (element == '') || (element == undefined))){
     return res.status(500).json({ success: false, message: 'Fields missing' });
    }

    // Check if files are provided
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    // }

    const existingKycData = await KYCModel.findOne({address});

    // Save the KYC data to the database
    if(existingKycData)     { 
    existingKycData.proofType = proofType;
    existingKycData.number = number;
    existingKycData.frontSideProof = frontSideProof;
    existingKycData.backSideProof = backSideProof;
    existingKycData.selfieProof = selfieProof;

    await existingKycData.save();
    res.status(200).json({ success: true, message: 'KYC data updated successfully' });
  } else {
    // Save the new KYC data to the database
    const kycData = new KYCModel({
      proofType,
      number,
      frontSideProof,
      backSideProof,
      selfieProof,
      address,
    });

    await kycData.save();
    res.status(200).json({ success: true, message: 'KYC data submitted successfully' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Internal server error' });
}
};


module.exports = { handleKyccontrol  };
