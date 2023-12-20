const mongoose = require('mongoose');

const NftSchema = new mongoose.Schema({
    uploadfile: String,
    nftName: String,
    Supply: String,
    Description: String,
    ExternalLink:String,
    isVerified:Boolean,
    traits:Array,
    collection:String
  
    // status:{
    //   type:Number,
    //   default:0
    // }
  });

  const NftModel = mongoose.model('Nft', NftSchema , 'Nft');
  module.exports = NftModel;