// // const kycSchema = require('../modules/kycSchema')
// const kycSchema = require('../modules/kycSchema');
// const adminschema = require('../modules/kycSchema')
// const userList=require('../modules/userRegister')
// const bcrypt=require('bcrypt')

// // exports.Adminkyc = async (req, res) => {
// // const{id}=req.query
// //  console.log(id,"888");
// //   try {
// //     const adminkyc = await kycSchema.findOne({_id:id});
// //     // console.log(mlmtree,"45");
// //     if (!adminkyc) {
// //        res.status(400).json({ message: " User Not Found" });
// //     }
    
// //     res.status(200).json(adminkyc);
    
// //   } catch (err) {
// //     console.error(err.message + " failed");
// //     res.status(500).send("Internal Server Error");
// //   }
// // }


// exports.AdminUserlist = async (req, res) => {
 
// //   const{id}=req.query
 
//   try {
//     const userlist = await userList.find({});
//     // console.log(mlmtree,"45");
//     if (!userlist) {
//        res.status(400).json({ message: " User Not Found" });
//     }
    
//     res.status(200).json(userlist);
    
//   } catch (err) {
//     console.error(err.message + " failed");
//     res.status(500).send("Internal Server Error");
//   }
// }



// exports.AdminSingleUserlist = async (req, res) => {
// const{id}=req.query
// console.log(req.query,"097665");
 
//   try {
//     const userlist = await userList.findOne({ _id: id });
//     const adminkyc = await kycSchema.findOne({ userId: id });
  
//     if (!userlist) {
//       res.status(400).json({ message: " User Not Found" });
//     }
    
//     res.status(200).json({userlist, adminkyc});
    
//   } catch (err) {
//     console.error(err.message + " failed");
//     res.status(500).json({message:"Internal Server Error",error:err.message});
//   }
// }




// // exports.AdminSingleUserlist = async (req, res) => {
// //   const { id } = req.query;
// //   console.log(req.query, "097665");

// //   try {
// //     const userlist = await userList.findOne({ _id: id });

// //     let adminkyc;
// //     try {
// //       adminkyc = await kycSchema.findOne({ _id: id });
// //     } catch (err) {
// //       console.error(err.message + " failed while fetching KYC details",err.message);
// //       // Handle KYC retrieval error
// //     }

// //     if (!userlist) {
// //       res.status(400).json({ message: "User Not Found" });
// //       return;
// //     }

// //     // Decide what to send in response
// //     const response = { userlist };
// //     if (adminkyc) {
// //       response.adminkyc = adminkyc;
// //     }

// //     res.status(200).json(response);
// //   } catch (err) {
// //     console.error(err.message + " failed");
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };
