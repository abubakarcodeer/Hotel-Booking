const router = require('express').Router();
const { isAuthenticatedUser } = require('../middleware/app.authentication');
const { roomReviewAdd, getRoomReviewsList, editSelfRoomReview, deleteSelfRoomReview } = require('../controllers/review.controllers');

// route for add user room review
router.route('/room-review-add/:id').post(isAuthenticatedUser, roomReviewAdd);

// route for get a room review list
router.route('/get-room-reviews-list/:room_id').get(getRoomReviewsList);

// route for edit self room review
router.route('/edit-room-review/:review_id').put(isAuthenticatedUser, editSelfRoomReview);

// route for delete self room review
router.route('/delete-room-review/:review_id').delete(isAuthenticatedUser, deleteSelfRoomReview);

module.exports = router;
