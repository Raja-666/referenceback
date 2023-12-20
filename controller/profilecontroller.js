const profileModel = require('../models/Profileschema');

const handleUpdateProfile = async (req, res) => {
  try {
    const { userName, bio, userEmail, website, address, profileImg, coverImg } = req.body;
    console.log('userName, bio, userEmail, website, address, profileImg, coverImg', userName, bio, userEmail, website, address, profileImg, coverImg);

    // Find the user by MetaMask address
    const existingUser = await profileModel.findOne({ address });

    // If the MetaMask address exists, update the profile
    if (existingUser) {
      // If updating userName, check for duplicates excluding the current user
      const sameuserName = await profileModel.findOne({ userName, address: { $ne: address } });
      if (sameuserName) {
        return res.status(400).json({
          status: 400,
          message: "Username already exists",
        });
      }

      // If updating userEmail, check for duplicates excluding the current user
      const sameuserEmail = await profileModel.findOne({ userEmail, address: { $ne: address } });
      if (sameuserEmail) {
        return res.status(400).json({
          status: 400,
          message: "User email already found",
        });
      }

      // If updating website, check for duplicates excluding the current user
      const samewebsite = await profileModel.findOne({ website, address: { $ne: address } });
      if (samewebsite) {
        return res.status(400).json({
          status: 400,
          message: "Website already found",
        });
      }

      const profileData = await profileModel.findOneAndUpdate({ address }, {
        profileImg,
        coverImg,
        userName,
        bio,
        userEmail,
        website,
        address
      });

      return res.status(200).json({ status: 200, success: true, message: 'Profile updated successfully' });
    } else {
      // If the MetaMask address doesn't exist, create a new profile

      // Check for duplicate username
      const sameuserName = await profileModel.findOne({ userName });
      if (sameuserName) {
        return res.status(400).json({
          status: 400,
          message: "Username already exists",
        });
      }

      // Check for duplicate user email
      const sameuserEmail = await profileModel.findOne({ userEmail });
      if (sameuserEmail) {
        return res.status(400).json({
          status: 400,
          message: "User email already found",
        });
      }

      // Check for duplicate website
      const samewebsite = await profileModel.findOne({ website });
      if (samewebsite) {
        return res.status(400).json({
          status: 400,
          message: "Website already found",
        });
      }

      const profileData = new profileModel({
        profileImg,
        coverImg,
        userName,
        bio,
        userEmail,
        website,
        address
      });

      await profileData.save();

      res.status(200).json({status: 200, success: true, message: 'Profile created successfully' });
    }

  } catch (error) {
    res.status(400).json({ message: "Upload Failed", error: error.message });
  }
};

const handleGetProfile = async (req, res) => {
  try {
    const { address } = req.body;

    // Find the user by MetaMask address
    const userData = await profileModel.findOne({ address });

    console.log('address', userData);
    if (!userData) {
      return res.status(400).json({
        success: false,
        data: 'No data...'
      });
    }

    let showObj = {
      '_id': userData._id,
      'userName': userData.userName,
      'userEmail': userData.userEmail,
      'website': userData.website,
      'address': userData.address,
      'profileImg': userData.profileImg,
      'coverImg': userData.coverImg,
      'bio': userData.bio,
      'status': userData.status
    };

    return res.status(200).json({
      success: true,
      data: showObj
    });

  } catch (error) {
    res.status(400).json({ message: "Upload Failed", error: error.message });
  }
};

module.exports = { handleUpdateProfile, handleGetProfile };
