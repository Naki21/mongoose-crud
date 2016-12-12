'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose-crud');
const db = mongoose.connection;

const Place = require('../models/places.js');

const mapPlace = require('./mapPlace.js');

const done = function() {
  db.close();
};

const loadPlaces = () =>
  new Promise((resolve, reject) => {
    const places = [];
    const fs = require('fs');
    const parse = require('csv').parse;
    const parser = parse({ columns: true });

    const input = fs.createReadStream('data/places.csv');
    input.on('error', e => reject(e));

    parser.on('readable', () => {
      let record;
      while (record = parser.read()) { // jshint ignore:line
        places.push(mapPlace(record));
      }
    });

    parser.on('error', e => reject(e));
    parser.on('finish', () => resolve(places));
    input.pipe(parser);
  });

db.once('open', function () {
  loadPlaces()
    // Below is the way to insert that bypasses mongoose validations
    // .then((places) => {
    //   Place.collection.insert(places);
    // }

    // This inserts and runs the documents through mongoose validations
    .then(Place.insertMany)
    .then((docs)=>{
      console.log(docs.length + ' documents inserted');
    })
    .then(done)
    .catch(console.log);
});
