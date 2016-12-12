// jshint node: true
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoose-crud');
const db = mongoose.connection;

const Place = require('./models/places.js');

const done = function() {
  db.close();
};

// CRUD Actions
const create = function(name, latitude, longitude, country) {
  /* Add Code Here */
};

const index = function(field, criterion) {
  Place.find()
    .then(function(places) {
      places.forEach(function(place) {
        console.log(place.toJSON());
      });
    })
    .catch(console.error)
    .then(done);
};

const show = function(id) {


    Place.findById(id)
      .then(function(place) {
        console.log(place.toJSON());
      })
      .catch(console.error)
      .then(done);
};

const update = function(id, field, value) {

  let modify = {};
  modify[field] = value;
  Place.findById(id)
    .then(function(place) {
      place[field] = value;
      return place.save();
      })
      .then(function(place){
        console.log(place.toJSON());
      })
    .catch(console.error)
    .then(done);
};

const destroy = function(id) {

    Place.findById(id)
      .then(function(place) {
        return place.remove();
      })
      .catch(console.error)
      .then(done);
};

// UI
db.once('open', function() {
  let command = process.argv[2];

  // Using more than once, avoiding jshint complaints
  let field;
  let id;

  switch (command) {
    case 'create':
      let name = process.argv[3];
      let latitude = process.argv[4];
      let longitude =  process.argv[5];
      let country =  process.argv[6];
      if (true || name) {
        create(name, latitude, longitude, country);
      } else {
        console.log('usage create <name> <latitutde> <longitude> [country]');
        done();
      }
      break;

    case `show`:
      id = process.argv[3];
      show(id);
      break;

    case 'update':
      id = process.argv[3];
      field = process.argv[4];
      let value = process.argv[5];
      update(id, field, value);
      break;

    case 'destroy':
      id = process.argv[3];
      destroy(id);
      break;

    default:
      index();
      break;
  }

});
