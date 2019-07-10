'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelectorAll('.map__filter');
  var fieldsetsForm = document.querySelectorAll('fieldset');
  var fieldPinAddress = document.querySelector('#address');
  var types = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  types.addEventListener('change', function () {
    var valueType = types.value;
    price.setAttribute('placeholder', window.data.MIN_PRICE_OF_OFFER[valueType]);
    price.setAttribute('min', window.data.MIN_PRICE_OF_OFFER[valueType]);
  });

  var onTimeChange = function (evt) {
    var select = evt.target === timeIn ? timeOut : timeIn;
    select.value = evt.target.value;
  };

  timeIn.addEventListener('change', onTimeChange);
  timeOut.addEventListener('change', onTimeChange);

  window.form = {
    adForm: adForm,
    mapFilters: mapFilters,
    fieldsetsForm: fieldsetsForm,
    setPinAddressValue: function (width, height) {
      var topMainPin = parseInt(window.map.mainPin.style.top, 10) + height;
      var leftMainPin = parseInt(window.map.mainPin.style.left, 10) + width;

      fieldPinAddress.value = leftMainPin + ', ' + topMainPin;
    }
  };

})();
