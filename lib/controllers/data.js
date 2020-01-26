const Data = require('../models/data');

exports.getPlaces = (req, res) => {
  console.log(res);
  const {
    min_latitude = '',
    min_longitude = '',
    max_latitude = '',
    max_longitude = '',
    city_id = '',
    limit = '',
    cursor = 0
  } = req;
  Data.getPlaces({
    min_latitude,
    min_longitude,
    max_latitude,
    max_longitude,
    city_id,
    limit,
    cursor
  }, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  });
};