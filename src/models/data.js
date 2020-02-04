// @flow

const db = require('../../db')
const ObjectID = require('mongodb').ObjectID

const paginate = (array, page_size, page_number) => array.slice((page_number - 1) * page_size, page_number * page_size)

const inRange = (min, max, val) => val >= min && val <= max

exports.getPlaces = (filters: Object, limit: any, cursor: any, cb: (any, any) => void) => {
  const {
    city_id
  } = filters

  const filter = {}

  if (city_id) filter.city_id = city_id

  db.get().collection('places').findOne(filter, (err, docs) => {
    if (!!docs) cb(true, docs)
    else {
      const filteredList = [{
        test: 1,
        latitude: '0',
        longitude: '20'
      },
      {
        test: 2,
        latitude: '0',
        longitude: '0'
      },
      {
        test: 3,
        latitude: '0',
        longitude: '0'
      }].filter(item => {
        const {
          latitude,
          longitude
        } = item
        const {
          min_latitude = -1,
          min_longitude = -1,
          max_latitude = 9999,
          max_longitude = 9999
        } = filters

        return inRange(min_latitude, max_latitude, latitude) && inRange(min_longitude, max_longitude, longitude)
      })

      cb(err, paginate(filteredList, limit, cursor))
    }
  });
}