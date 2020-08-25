const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}

console.log(result.parsed);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let dev_db_url = process.env.LOCATIONS_DB_URL;

mongoose.connect(
  dev_db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('connection to mongoDB successful'),
);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//end mongoose setup
//routes
const locations = require('../routes/locations');
app.use('/locations', locations);
app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});
