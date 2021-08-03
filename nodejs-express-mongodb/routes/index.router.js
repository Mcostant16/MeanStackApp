const express = require('express');
const router = express.Router();
    
const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/users', jwtHelper.verifyJwtToken, ctrlUser.users);
router.put('/updateUser', jwtHelper.verifyJwtToken, ctrlUser.updateUser);
router.delete('/:id', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);

module.exports = router;

