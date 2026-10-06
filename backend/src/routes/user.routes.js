
const router = require('express').Router();
const {
  getUser, updateUser, deleteUser, avatarUpdate, getUsersList, getUserById, deleteUserById
} = require('../controllers/user.controllers');
const { isAuthenticatedUser, isAdmin } = require('../middleware/app.authentication');
const avatarUpload = require('../middleware/user.avatar.upload');

// get user info route
router.route('/get-user').get(isAuthenticatedUser, getUser);
router.route('/get-user/:id').get(isAuthenticatedUser, isAdmin, getUserById);

// update user info route
router.route('/update-user').put(isAuthenticatedUser, updateUser);

// user profile image/avatar update
router.route('/avatar-update').put(isAuthenticatedUser, avatarUpload.single('avatar'), avatarUpdate);

// delete user route
router.route('/delete-user').delete(isAuthenticatedUser, deleteUser);
router.route('/delete-user/:id').delete(isAuthenticatedUser, isAdmin, deleteUserById);

// get all users list for admin
router.route('/all-users-list').get(isAuthenticatedUser, isAdmin, getUsersList);

module.exports = router;
