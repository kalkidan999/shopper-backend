const express = require('express');
const auth = require('../middleware/auth')
const user_controller = require('../controller/user_controller')

const router = express.Router();

// create or register user
router.post('/register', user_controller.userPost);

// login user
router.post('/login', user_controller.userLogin);

// gets all users
router.get('/', user_controller.userAll);

// get a specific users
router.get('/:id', user_controller.userID);

// update a specific user
router.put('/:id', user_controller.userUpdate);

// delete a spaecific user
router.delete('/:id', user_controller.userDelete);






module.exports = router;
