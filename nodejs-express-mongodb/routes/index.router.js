const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfileImages', jwtHelper.verifyJwtToken, ctrlUser.userProfileImages);
router.get('/users', jwtHelper.verifyJwtToken, ctrlUser.users);
router.put('/updateUser', jwtHelper.verifyJwtToken, ctrlUser.updateUser);
router.delete('/:id', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);
router.post('/uploadImage',  ctrlUser.uploadImage);
router.get('/uploads',  ctrlUser.uploads);

module.exports = router;

