'use strict';

window.helpers = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  };

  var getRandomItem = function (arr) {
    var min = 0;
    var max = arr.length - 1;

    var randomIdx = getRandomNumber(min, max);

    var randomItem = arr[randomIdx];

    return randomItem;
  };

  var checkIsEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var checkIsEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, arguments);
      }, DEBOUNCE_INTERVAL);
    };
  };

  return {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    checkIsEscEvent: checkIsEscEvent,
    checkIsEnterEvent: checkIsEnterEvent,
    debounce: debounce
  };
})();
