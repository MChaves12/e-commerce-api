const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updatePassword,
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updatePassword').patch(updatePassword);

router.route('/:id').get(authenticateUser, getSingleUser);


module.exports = router;
