const express = require('express');

// to take querystring in the routes
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

// to check all is right
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;