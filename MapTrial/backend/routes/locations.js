var express = require('express');
var router = express.Router();
var Forecast = require('../models/Forecast');
router.get('/get/:fullname', async function (req, res) {
  const forecast = await Forecast.find({fullname: req.params.fullname});
  res.send(forecast);
});
module.exports = router;
