const express = require('express');
const addressController = require('../controllers/address.controller');
const router = express.Router();

router.post('/add', addressController.addAddress);

module.exports = router;