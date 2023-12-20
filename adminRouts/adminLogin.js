const express = require('express');
const router = express.Router();




const adminLogin = require('../adminController/adminLoginController')

const changepassword = require('../adminController/changePassword')

// const adminKyc = require('../adminController/adminKyc')

const forgotPassword = require('../adminController/forgotPassword')
const collectionController = require('../adminController/collectionController')





router.post("/adminlogin", adminLogin.handleAdminlogin)
router.post('/twoFactorGetCode', adminLogin.generateTwoFactorCode)
router.post('/twoFactorVerify', adminLogin.loginTwoFactorVerify)
router.post('/disableTwoFactor', adminLogin.disableTwoFactorAuthentication)

router.post('/twoFactorVerification', adminLogin.twoFactorVerification)




router.post('/admin/changepassword', changepassword.adminpasswordchange)

// router.get('/admin/kyc', adminKyc.Adminkyc)

// router.get('/admin/userlist', adminKyc.AdminUserlist)

// router.get('/admin/singleuser', adminKyc.AdminSingleUserlist)



router.post('/admin/oldPattern', changepassword.handleOldpattern)
router.post('/admin/newPattern', changepassword.updatePattern)


router.post('/admin/forgetPassword/verifyEmail', forgotPassword.verifyEmail)
router.post('/admin/forgetPassword/setNewPassword', forgotPassword.setNewPassword)
router.post('/admin/forgetPattern/setNewPattern', forgotPassword.setNewPattern)


router.post('/admin/collection/list', collectionController.handleGetCollections)
router.post('/admin/collection/update', collectionController.handleUpdateCollections)
router.get('/admin/collection/bbfbbb', collectionController.handleUpdateCollections)


// USERS
router.post('/admin/user/list', collectionController.handleGetUserList)
router.post('/admin/user/update', collectionController.handleUpdateUser)



module.exports = router;
