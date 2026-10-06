const router = require('express').Router();
const { isAuthenticatedUser, isAdmin } = require('../middleware/app.authentication');
const {
  placedBookingOrder, getBookingOrderByUserId, cancelSelfBookingOrder, getBookingOrderForAdmin, updatedBookingOrderByAdmin, deleteBookingOrderByAdmin
} = require('../controllers/booking.controllers');

// route for placed a room booking order
router.route('/placed-booking-order/:id').post(isAuthenticatedUser, placedBookingOrder);

// routes for a user get bookings list and cancel booking order
router.route('/get-user-booking-orders').get(isAuthenticatedUser, getBookingOrderByUserId);
router.route('/cancel-booking-order/:id').put(isAuthenticatedUser, cancelSelfBookingOrder);

// routes for admin get all bookings list, rejected, approved and checkout placed order
router.route('/get-all-booking-orders').get(isAuthenticatedUser, isAdmin, getBookingOrderForAdmin);
router.route('/updated-booking-order/:id').put(isAuthenticatedUser, isAdmin, updatedBookingOrderByAdmin);
router.route('/delete-booking-order/:id').delete(isAuthenticatedUser, isAdmin, deleteBookingOrderByAdmin);

module.exports = router;
