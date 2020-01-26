// @flow

const db = require('../../db');
const ObjectID = require('mongodb').ObjectID;

exports.getPlaces = (userID: string, cb: (any, any) => void ) => {
  db.get().collection('users').findOne({ userID: userID }, (err, doc) => {
    if(!!!doc) cb(true, doc);
    else cb(err, doc);
  });
}