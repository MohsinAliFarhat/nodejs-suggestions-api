const mongoose = require('mongoose');
const citySchema = mongoose.Schema({
    name:String,
    lat:String,
    long:String,
});

module.exports = mongoose.model("cities",citySchema);