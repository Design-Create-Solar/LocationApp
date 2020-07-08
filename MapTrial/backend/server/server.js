//console.log(Venue)
//also WHATS A GOOD NAME FOR THE APP

var Venue = require('../models/busyness.js')

var express = require("express");
let app = express();

app.get("/:location", async (req, res) => {
    let temp = await Venue.find({ 'venue_name': req.params.location }, 'busyness', function (err, venues) {
        if (err) return handleError(err);
        return venues[0].busyness;
    })
    res.json(
    {
        "venue": temp
    })
} )
app.listen(5000);

var mongoose = require("mongoose");
var mongoDB = 'mongodb+srv://designcreatesolar:solarclub@cluster0-mcpqp.mongodb.net/venue_busyness?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

