// require mongoDB
const mongoose = require('mongoose');

// require Review to add it to it's campground
const Review = require('./review');

const Schema = mongoose.Schema;

// to show JSON in virtuals
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
    url: String,
    filename: String
});

// to return image with smaller size (it's from cloudinary)
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);

// to show smaller description about clicking camp in the map
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href='/campgrounds/${this._id}'><b>${this.title}</b></a>
            <p>${this.description.substring(0,30)}...</p>`
});

// to delete all reviews on the campground if we delete it 
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: { $in: doc.reviews }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);