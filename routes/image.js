const express = require('express');
const imageController = require('../controllers/image.controller');
// Helper file we created
const imageUploader = require("../helpers/image-uploader");
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//By using middleware only authenticated user can upload files
router.post('/upload', checkAuth.checkAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports = router;