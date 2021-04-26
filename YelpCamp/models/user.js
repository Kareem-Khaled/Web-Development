const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// adding username & password & make sure that username is unique & more functions
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);