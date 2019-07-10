'use strict';

(function () {
  var TYPES_OF_OFFER = [
    'palace',
    'flat',
    'house',
    'bungalo'];

  var MIN_PRICE_OF_OFFER = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var MAP_SETUP = {
    width: {
      min: 0,
      max: 1150
    },
    height: {
      min: 130,
      max: 630
    }
  };

  var MAIN_PIN_SETUP = {
    width: 65 / 2,
    height: 65 / 2,
    widthMove: 65 / 2,
    heightMove: 65 + 22,
  };

  var authors = 8;

  window.data = {
    TYPES_OF_OFFER: TYPES_OF_OFFER,
    MIN_PRICE_OF_OFFER: MIN_PRICE_OF_OFFER,
    MAP_SETUP: MAP_SETUP,
    MAIN_PIN_SETUP: MAIN_PIN_SETUP,
    authors: authors
  };
})();


