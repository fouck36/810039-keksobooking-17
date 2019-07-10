'use strict';
(function () {


    var getRandomNumber = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomOffer = function (offers) {
      return offers[getRandomNumber(0, offers.length)];
    };

    var setDisabled = function (array, isDisabled) {
      for (var i = 0; i < array.length; i++) {
        if (isDisabled) {
          array[i].setAttribute('disabled', '');
        } else {
          array[i].removeAttribute('disabled', '');
        }
      }

      return array;
    };

  var generatePinsData = function () {
    var pins = [];

    for (var i = 1; i <= window.data.authors; i++) {
      pins.push({
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          type: getRandomOffer(window.data.TYPES_OF_OFFER)
        },
        location: {
          x: getRandomNumber(window.data.MAP_SETUP.width.min, window.data.MAP_SETUP.width.max),
          y: getRandomNumber(window.data.MAP_SETUP.height.min, window.data.MAP_SETUP.height.max)
        }
      });
    }

    return pins;
  };
  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomOffer: getRandomOffer,
    setDisabled: setDisabled,
    generatePinsData: generatePinsData,
  };



})();
