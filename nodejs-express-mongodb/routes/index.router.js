const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/addNote', ctrlUser.addNote);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfileImages', jwtHelper.verifyJwtToken, ctrlUser.userProfileImages);
router.get('/users', jwtHelper.verifyJwtToken, ctrlUser.users);
router.put('/updateUser', jwtHelper.verifyJwtToken, ctrlUser.updateUser);
router.delete('/:id', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);
router.post('/uploadImage',  ctrlUser.uploadImage);
router.get('/uploads',  ctrlUser.uploads);
router.get('/biblePassage',  ctrlUser.biblePassage);
router.get('/bibles',  ctrlUser.bibles);
router.get('/books',  ctrlUser.books);
router.get('/chapters',  ctrlUser.chapters);
router.get('/notes',  ctrlUser.notes);
module.exports = router;

