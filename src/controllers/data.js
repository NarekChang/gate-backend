/*
@flow
*/

const Data = require('../models/data')

exports.getPlaces = (req, res) => {
  const { query = {} } = req
  const {
    min_latitude,
    min_longitude,
    max_latitude,
    max_longitude,
    city_id = false,
    limit = 99999,
    cursor = 1
  } = query

  Data.getPlaces({
    min_latitude,
    min_longitude,
    max_latitude,
    max_longitude,
    city_id
  }, limit, cursor, (err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    res.send(docs);
  })
}
