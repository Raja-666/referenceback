const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const speakEasy = require('@levminer/speakeasy')

const qrCode = require('qrcode')

const adminLogin = require("../adminModules/AdminSchema");


// exports.handleAdminlogin = async (req, res) => {
//     const { email, password, pattern } = req.body;
//     const loginAdmin = await adminLogin.findOne({
//       email: email,
//     });
//     if (!loginAdmin) res.status(404).json({ msg: "Please enter Correct Email" });

//   const patternverify = JSON.stringify(pattern);
  
//   const hashPassword = await bcrypt.compare(password, loginAdmin.password)
//   console.log(hashPassword,"gghgg");
//   try {
//     if (loginAdmin.password !== hashPassword) {
//       return res.status(404).json({ message: "please enter correct password" });
//     }
  
    

//     else if (loginAdmin.pattern !== patternverify) {
//       return res.status(404).json({ message: "please enter correct pattern" });
//     } else {
//       const adminId=loginAdmin._id
//       console.log(adminId);
//       return res.status(200).json({ message: "Admin-Login sucessfully!" });
//     }
//   } catch (error) {
//     console.log(error,'adminlogin error');
//   }
// };



// exports.handleAdminlogin = async (req, res) => {
//     const { email, password, pattern } = req.body;
//     const loginAdmin = await adminLogin.findOne({
//       email: email,
//     });
//     if (!loginAdmin) res.status(404).json({ msg: "Please enter Correct Email" });

//   const patternverify = JSON.stringify(pattern);

//   try {
//     // const hashPassword = await bcrypt.compare(password, loginAdmin.password)
    
//     if (loginAdmin.password!== password) {
//       return res.status(404).json({ message: "please enter correct password" });
//     } else if (loginAdmin.pattern !== patternverify) {
//       return res.status(404).json({ message: "please enter correct pattern" });
//     } else 
//     {
//       const adminId = loginAdmin._id
//       console.log(adminId,"ii");
//       // const token = jwt.sign({  adminId:loginAdmin._id }, 'secretKey', { expiresIn: "1h" });
//       return res.status(200).json({ message: `Admin Login sucesssfully 
//        `, adminId });
//     }
//   } catch (error) {
//     console.log(error,'adminlogin error');
//   }
// };
   




 exports.handleAdminlogin= async (req, res) => {

    try {
        // console.log(req.body);
        const { email, password, pattern } = req.body;
        const loginAdminData = await adminLogin.findOne({ email })

        if (!loginAdminData) {
            return res.status(404).json({ message: "Please enter Correct Email" });
        }
        const patternverify = JSON.stringify(pattern);
        const verifyPassword = await bcrypt.compare(password, loginAdminData.password)
        if (!verifyPassword) {
            return res.status(404).json({ message: "please enter correct password" });
        } else if (loginAdminData.pattern !== patternverify) {
            return res.status(404).json({ message: "please enter correct pattern" });
        }
        
        else {
    //    const adminId = loginAdminData._id;

             const token = jwt.sign({adminId:loginAdminData._id}, 'safekey', { expiresIn: "20h" });

            return res.status(200).json({ message: "Admin-Login sucessfully!" ,token,loginAdminData});
        }
    } catch (error) {
        res.status(500).json({ message: 'Error Generating Admin Login', error: error.message })
    }
 }




//  -------------------------------------------------


exports.generateTwoFactorCode = async (req, res) => {

  try {
      const { id } = req.body
      console.log(id)
      // checking Already Verified User
      const secretCode = speakEasy.generateSecret()

      await adminLogin.updateOne({ _id: id }, { $set: { temp_secret: secretCode } })
      const twoFactorAuthData = await adminLogin.findOne({ _id: id })

      // generating QrCode Img Src
      qrCode.toDataURL(twoFactorAuthData.temp_secret.otpauth_url, function (err, data) {
          if (err) {
              return res.status(404).json({ message: 'Generating QrCode Error' })
          }
          res.status(200).json({ message: 'Generate TwoFactorAuth', authCode: secretCode.base32, qrCodeImgSrc: data, twoFactorAuthData })
      })

  } catch (error) {
      res.status(500).json({ message: 'Error Generating TwoFactor Secret', error: error.message })
  }
}



exports.loginTwoFactorVerify = async (req, res) => {
  try {
      const { id, token } = req.body
      console.log(id, token);
      const getUser = await adminLogin.findOne({ _id: id })
      const { base32: secret } = getUser.temp_secret

      let tokenValidates = speakEasy.totp.verify({
          secret,
          encoding: "base32",
          token,
      })

      let qrCodeVerify = speakEasy.totp.verify({
          secret: getUser.temp_secret.ascii,
          encoding: 'ascii',
          token
      })
      if (!qrCodeVerify) {
          return res.status(401).json({ message: 'Authentication Invalid' })
      }
      if (!tokenValidates) {
          return res.status(401).json({ message: 'Authentication Invalid Token' })
      }

      await adminLogin.updateOne({ _id: id }, { $set: { temp_secret: null, secret: getUser.temp_secret, authVerify: true } })
      const updateUser = await adminLogin.findOne({ _id: id })
      res.status(200).json({ message: 'Authentication Verified', twoFactorAuth: updateUser.twoFactorAuth, })

  } catch (err) {
      res.status(500).json({ message: 'Error Generating Authencation verify ', error: err.message })
  }
}



exports. disableTwoFactorAuthentication = async (req, res) => {
  try {
      const { id } = req.body
      await adminLogin.updateOne({ _id: id }, { $set: { secret: null, authVerify: false } })
      res.status(200).json({ message: 'Disabled Your Authetication' })

  } catch (error) {
      res.status(500).json({ message: 'Error Disable Your Authentication', error: error.message })
  }
}



exports.twoFactorVerification=async (req, res) => {
    try {
        const { id, token } = req.body
        console.log(id, token);
        const getUser = await adminLogin.findOne({ _id: id })

        let tokenValidates = speakEasy.totp.verify({
            secret: getUser.secret.base32,
            encoding: "base32",
            token,
        })

        let qrCodeVerify = speakEasy.totp.verify({
            secret: getUser.secret.ascii,
            encoding: 'ascii',
            token
        })
        if (!qrCodeVerify) {
            return res.status(401).json({ message: 'Authentication Invalid' })
        }
        if (!tokenValidates) {
            return res.status(401).json({ message: 'Authentication Invalid Token' })
        }
        res.status(200).json({ message: 'Authentication Verified', })

    } catch (err) {
        res.status(500).json({ message: 'Error Generating Authencation verify ', error: err.message })
    }
}
