
const router = require('express').Router();
const { getDashboardData } = require('../controllers/apps.controllers');
const { isAuthenticatedUser, isAdmin } = require('../middleware/app.authentication');

// get dashboard info by admin
router.route('/dashboard').get(isAuthenticatedUser, isAdmin, getDashboardData);

module.exports = router;
