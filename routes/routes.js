const express = require('express');
const router = express.Router();

const authController = require('../controllers/Auth');
const uploadMiddleware = require('../middlewares/Upload');
const uploadControllers = require('../controllers/Upload');

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/update-user', authController.update_user);
router.get('/users', authController.get_users);
router.delete('/delete/:email', authController.delete_user);

// File Upload Routes
router.post('/upload', uploadMiddleware.upload.single('file'), uploadControllers.upload_file);
router.get('/files', uploadControllers.get_files);
router.get('/file/:filename', uploadControllers.get_file_by_filename);
router.get('/image/:filename', uploadControllers.get_image_by_filename);
router.get('/get_any_file_by_filename/:filename', uploadControllers.get_any_file_by_filename);
router.delete('/file/:id', uploadControllers.delete_file_by_id);

module.exports = router;