'use strict';

const mapPlace = function (h) {
  let newPlace = {
    name: {}
  };
  Object.keys(h).forEach(function() {
    newPlace.name = h.name;
    newPlace.latitude = h.latitude;
    newPlace.longitude = h.longitude;
    newPlace.country = h.country;
    newPlace.isWesternHemisphere = h.isWesternHemisphere;
    newPlace.isNorthernHemisphere = h.isNorthernHemisphere;
  });
  return newPlace;
};

module.exports = mapPlace;
