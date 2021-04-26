// to access dbs in models folder
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfuly add new review');
    res.redirect(`/campgrounds/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfuly removed a review');
    res.redirect(`/campgrounds/${req.params.id}`);
};