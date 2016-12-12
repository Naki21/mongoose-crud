// jshint node: true
'use strict';
const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  timestamps: true
});


placeSchema.virtual('isNorthernHemisphere').get(function() {
let lat;
  if (!this.latitude) {
    return 0;
  }

  if (this.latitude > 0) {
    lat = true;
  } else {
    lat = false;
  }
  return lat;
});


placeSchema.virtual('isWesternHemisphere').get(function(
) {
  let long;
  if (!this.longitude) {
    return 0;
  }
  if (this.longitude < 0) {
    long = true;
  } else {
    long = false;
  }
  return long;
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
