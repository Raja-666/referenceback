const mongoose = require('mongoose');

// Create Collection model (you may need to adjust the schema)
const collectionSchema = new mongoose.Schema({
    logo: String,
    collectionName: String,
    description: String,
    collectionUrl: String,
    address:String,
    isVerified:Boolean,
    status:{
      type:Number,
      default:0
    }
  });

  const CollectionModel = mongoose.model('Collection', collectionSchema,'Collection');
module.exports = CollectionModel;