const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Collection = require('../models/Schema');
const UserModal = require('../models/Profileschema');
const Nftcreate = require('../models/NftSchema');


const handleGetCollections = async (req, res) => {
    try {
        const status = req.body.status // 0,1,2

        let findQ = {}
        if (status) {
            findQ = { status: status }
        }

        const collections = await Collection.find(findQ, { logo: 0 });
        res.status(200).json({ success: true, data: collections, message: 'Successfully get!!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: [], message: 'Internal server error' });
    }
};


const handleUpdateCollections = async (req, res) => {
    try {
        const reqData = req.body
        /**
         * _id : Id
         * status : 1 -> apprv
         * status : 2 -> reject
         */

        await Collection.findOneAndUpdate({ _id: reqData._id }, { status: reqData.status });
        msg = 'Collection Verified'
        if (reqData.status == 2) {
            msg = 'Collection Rejected'
        }
        res.status(200).json({ success: true, message: msg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Err-' + error.message });
    }
};




const handleGetUserList = async (req, res) => {
    try {
        const status = req.body.status // 0,1,2

        let findQ = {}
        if (status) {
            findQ = { status: status }
        }

        const userList = await UserModal.find(findQ, { });
        res.status(200).json({ success: true, data: userList, message: 'Successfully get!!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: [], message: 'Internal server error' });
    }
};



const handleUpdateUser = async (req, res) => {
    try {
        const reqData = req.body
        /**
         * _id : Id
         * status : 1 -> apprv
         * status : 2 -> reject
         */

        await UserModal.findOneAndUpdate({ _id: reqData._id }, { status: reqData.status });
        msg = 'User Verified'
        if (reqData.status == 2) {
            msg = 'User Rejected'
        }
        res.status(200).json({ success: true, message: msg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Err-' + error.message });
    }
};

module.exports = { handleGetCollections, handleUpdateCollections , handleGetUserList , handleUpdateUser};