const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  status: {
    default: 0,
    type: Number
  },
  proofType: String,
  frontSideProof: String,
  backSideProof: String,
  selfieProof: String,
  address: String,
  number:String
}, {
  timestamps: true
});

const KYCModel = mongoose.model('KYC', kycSchema);
module.exports = KYCModel;