// to access Campground db in models folder
const Campground = require('../models/campground');

// to upload images
const { cloudinary } = require('../cloudinary');

// to use maps
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

// rendering campgrounds index page
module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({}).populate('popupText');
    res.render('campgrounds/index', { campgrounds });
};

// rendering add new campground page
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
};

// create new campground and redirecting to it
module.exports.createCampground = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1 // limit number of search reasult
    }).send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Succesfuly made a new campground ;) ');
    res.redirect(`/campgrounds/${campground._id}`);
};

// rendering edit campground page
module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', "Can't Find That Campground");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
};

// update campground and redirecting to it
module.exports.updateCampground = async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...images);
    await campground.save();
    if (req.body.deleteImages) {
        // delete images from cloudinary
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // delete images from campground
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', 'Succesfuly Updated a Campground :) ');
    res.redirect(`/campgrounds/${req.params.id}`);
};

// rendering each campground page
module.exports.showCampground = async (req, res) => {
    // we use populate to show all reviews bcs we store them in campground by id
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', "Can't Find That Campground");
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
};

// deleting a campground and redirecting to all campgrounds page 
module.exports.deleteCampground = async (req, res) => {
    await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Succesfuly delete a campground D= ');
    res.redirect('/campgrounds');
};