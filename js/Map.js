'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  window.map = {
    map: map,
    mainPin: mainPin
  };

  var onActivatePage = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.utils.setDisabled(window.form.mapFilters, false);
    window.utils.setDisabled(window.form.fieldsetsForm, false);
    window.pin.renderPins(window.utils.generatePinsData());
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

      if (mainPinTop > window.data.MAP_SETUP.height.min - window.data.MAIN_PIN_SETUP.heightMove && mainPinTop < window.data.MAP_SETUP.height.max) {
        mainPin.style.top = mainPinTop + 'px';
      }

      if (mainPinLeft > window.data.MAP_SETUP.width.min - window.data.MAIN_PIN_SETUP.width && mainPinLeft < map.offsetWidth - window.data.MAIN_PIN_SETUP.widthMove) {
        mainPin.style.left = mainPinLeft + 'px';
      }
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      moveMainPin(moveEvt);
      window.form.setPinAddressValue(window.data.MAIN_PIN_SETUP.widthMove, window.data.MAIN_PIN_SETUP.heightMove);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      moveMainPin(upEvt);
      window.form.setPinAddressValue(window.data.MAIN_PIN_SETUP.widthMove, window.data.MAIN_PIN_SETUP.heightMove);

      mainPin.removeEventListener('mouseup', onActivatePage);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.utils.setDisabled(window.form.mapFilters, true);
  window.utils.setDisabled(window.form.fieldsetsForm, true);
  window.form.setPinAddressValue(window.data.MAIN_PIN_SETUP.width, window.data.MAIN_PIN_SETUP.height);


})();

