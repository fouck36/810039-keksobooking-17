'use strict';

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

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFilters = map.querySelectorAll('.map__filter');
var fieldsetsForm = document.querySelectorAll('fieldset');
var mainPin = map.querySelector('.map__pin--main');
var fieldPinAddress = document.querySelector('#address');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarListElement = map.querySelector('.map__pins');

var types = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');


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
        x: getRandomNumber(MAP_SETUP.width.min, MAP_SETUP.width.max),
        y: getRandomNumber(MAP_SETUP.height.min, MAP_SETUP.height.max)
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

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  if (map.classList.contains('map--faded')) {
    onActivatePage();
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var moveMainPin = function (mouseEvt) {
    var shift = {
      x: startCoords.x - mouseEvt.clientX,
      y: startCoords.y - mouseEvt.clientY
    };

    startCoords = {
      x: mouseEvt.clientX,
      y: mouseEvt.clientY
    };

    var mainPinTop = mainPin.offsetTop - shift.y;
    var mainPinLeft = mainPin.offsetLeft - shift.x;

    if (mainPinTop > MAP_SETUP.height.min - MAIN_PIN_SETUP.heightMove && mainPinTop < MAP_SETUP.height.max) {
      mainPin.style.top = mainPinTop + 'px';
    }

    if (mainPinLeft > MAP_SETUP.width.min - MAIN_PIN_SETUP.width && mainPinLeft < map.offsetWidth - MAIN_PIN_SETUP.widthMove) {
      mainPin.style.left = mainPinLeft + 'px';
    }
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    moveMainPin(moveEvt);
    setPinAddressValue(MAIN_PIN_SETUP.widthMove, MAIN_PIN_SETUP.heightMove);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    moveMainPin(upEvt);
    setPinAddressValue(MAIN_PIN_SETUP.widthMove, MAIN_PIN_SETUP.heightMove);

    mainPin.removeEventListener('mouseup', onActivatePage);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

types.addEventListener('change', function () {
  var valueType = types.value;
  price.setAttribute('placeholder', MIN_PRICE_OF_OFFER[valueType]);
  price.setAttribute('min', MIN_PRICE_OF_OFFER[valueType]);
});

var onTimeChange = function (evt) {
  var select = evt.target === timeIn ? timeOut : timeIn;
  select.value = evt.target.value;
};

timeIn.addEventListener('change', onTimeChange);
timeOut.addEventListener('change', onTimeChange);

setDisabled(mapFilters, true);
setDisabled(fieldsetsForm, true);
setPinAddressValue(MAIN_PIN_SETUP.width, MAIN_PIN_SETUP.height);

