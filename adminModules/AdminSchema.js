const mongoose = require("mongoose");

const MySchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // pattern: {
  //   type: String,
  //   required: true,
    
  //   }



   email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      pattern: {
        type: String,
        required: true,
      },
      secret:{
        type:Object,
        default:null

      },
      temp_secret:{
        type:Object,
        default:null
      },
      authVerify:{
        type:Boolean
      }

});

module.exports = adminregister = mongoose.model("Admin", MySchema);