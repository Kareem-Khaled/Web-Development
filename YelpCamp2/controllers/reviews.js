// to access dbs in models folder
const Campground = require('../models/campground');
const Review = require('../models/review');

// add new review
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfuly Add New Review');
    res.redirect(`/campgrounds/${req.params.id}`);
};

// delete review
module.exports.deleteReview = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfuly Removed The Review');
    res.redirect(`/campgrounds/${req.params.id}`);
};