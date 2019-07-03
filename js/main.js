'use strict';

var TYPES_OF_OFFER = ['palace', 'flat', 'house', 'bungalo'];

var MapSetup = {
  width: {
    min: 0,
    max: 1150
  },
  height: {
    min: 130,
    max: 630
  }
};

var authors = 8;

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFilters = map.querySelectorAll('.map__filter');
var fieldsetsForm = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var fieldPinAddress = document.querySelector('#address');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = map.querySelector('.map__pins');



var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomOffer = function (offers) {
  return offers[getRandomNumber(0, offers.length)];
};

var generatePinsData = function () {
  var pins = [];

  for (var i = 1; i <= authors; i++) {
    pins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: getRandomOffer(TYPES_OF_OFFER)
      },
      location: {
        x: getRandomNumber(MapSetup.width.min, MapSetup.width.max),
        y: getRandomNumber(MapSetup.height.min, MapSetup.height.max)
      }
    });
  }

  return pins;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var img = pinElement.querySelector('img');

  img.setAttribute('src', pin.author.avatar);
  img.setAttribute('alt', 'Заголовок объявления');
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';


  return pinElement;
};

var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  similarListElement.appendChild(fragment);
};

var setPinAddressValue = function (width, height) {
  var topMainPin = parseInt(mainPin.style.top, 10) + height;
  var leftMainPin = parseInt(mainPin.style.left, 10) + width;

  fieldPinAddress.value = leftMainPin + ', ' + topMainPin;
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

var onActivatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setDisabled(mapFilters, false);
  setDisabled(fieldsetsForm, false);
  renderPins(generatePinsData());
};

mainPin.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (map.classList.contains('map--faded')) {
    onActivatePage();
  }
});

setDisabled(mapFilters, true);
setDisabled(fieldsetsForm, true);
setPinAddressValue(0, 0);

