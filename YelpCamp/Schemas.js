const joi = require('joi');

module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required(),
        image: joi.string(),
        price: joi.string().required().min(0),
        description: joi.string().required(),
        location: joi.string().required()
    }).required(),
    deleteImages: Joi.araay()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        body: joi.string().required(),
        rating: joi.number().required()
    }).required()
});