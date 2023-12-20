const AdminLoginModal=require('../adminModules/AdminSchema')
const bcrypt = require('bcrypt')



// const AdminLoginModal = require('../../models/admin/adminLogin')
// const bcrypt = require('bcrypt');
const speakEasy = require('@levminer/speakeasy')
const jwt = require('jsonwebtoken')
const qrCode = require('qrcode')
// require('dotenv').config()


exports.verifyEmail = async (req, res) => {
    try {
        const { email } = req.body
        const adminData = await AdminLoginModal.findOne({ email })
        if (!adminData) {
            return res.status(401).json({ message: 'User Not Found' })
        }

        res.status(200).json({ message: 'Email Verified', adminData })

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message })
    }
}


// user SetNewPassword 
exports.setNewPassword = async (req, res) => {

    console.log(req.body);
    try {
        const { password, id } = req.body
        const userData = await AdminLoginModal.findOne({ _id: id })

        const checkPassword = await bcrypt.compare(password, userData.password)

        if (checkPassword) {
            res.status(409).json({ message: 'Please Try Another Password' })
            return
        }
        console.log(checkPassword);
        const hashPassword = await bcrypt.hash(password, 10)
        await AdminLoginModal.updateOne({ _id: id }, { $set: { password: hashPassword } })
        res.status(200).json({ message: 'Password Updated' })
    } catch (err) {
        res.status(500).json({ message: "Internal Error", error: err.message })
    }
}

exports.setNewPattern = async (req, res) => {
    const { newpattern, id } = req.body;
console.log(newpattern,id);

    const oldPatternString = JSON.stringify(newpattern);

    try {
        const userDetails = await AdminLoginModal.findOne({
            _id: id,
        });
        if (oldPatternString === userDetails.pattern) {
            return res.status(409).json({ message: "Already exisist Pattern" });
        }
        await AdminLoginModal.updateOne({ _id: id }, { $set: { pattern: oldPatternString } });
        res.status(200).json({ message: "NewPattern Updated" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};