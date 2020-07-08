const mongoose = require("mongoose")

const venueSchema = new mongoose.Schema({
    venue_name: String,
    busyness: String,
})

const Venue = mongoose.model("Venue", venueSchema)
module.exports = Venue