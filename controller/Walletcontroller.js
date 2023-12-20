const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('../models/Walletconnect');

const handleWalletaddress = async (req, res) => {
    try {
      const { userId, address } = req.body;
  
      // Check if the wallet address is already connected
      const existingWallet = await Wallet.findOne({ userId, address });
      if (existingWallet) {
        return res.status(400).json({ error: 'Wallet address already connected' });
      }
  
      // Save the connected wallet address to the database
      const newWallet = new Wallet({ userId, address });
      await newWallet.save();
  
      res.json({ message: 'Wallet connected successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Route to get wallet details for a user
  const handleWalletdetails =  async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Retrieve wallet details for the user
      const walletDetails = await Wallet.find({ userId });
  
      res.json({ walletDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = {handleWalletaddress, handleWalletdetails}