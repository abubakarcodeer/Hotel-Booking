
const router = require('express').Router();
const avatarUpload = require('../middleware/user.avatar.upload');
const { apiLimiter } = require('../middleware/access.limiter');
const { isAuthenticatedUser, isRefreshTokenValid } = require('../middleware/app.authentication');
const {
  register, loginUser, logoutUser, forgotPassword, resetPassword, changePassword, refreshToken
} = require('../controllers/auth.controllers');

// routes for register, login and logout user
router.route('/auth/registration').post(avatarUpload.single('avatar'), register);
router.route('/auth/login').post(apiLimiter, avatarUpload.none(), loginUser);
router.route('/auth/logout').post(isAuthenticatedUser, logoutUser);

// routes for forgot & change password
router.route('/auth/forgot-password').post(forgotPassword);
router.route('/auth/reset-password/:token').post(resetPassword);
router.route('/auth/change-password').post(isAuthenticatedUser, changePassword);

// route for get user refresh JWT Token
router.route('/auth/refresh-token').get(isRefreshTokenValid, refreshToken);

module.exports = router;
