'use strict';

window.helpers = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

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

  var getShuffledArray = function (arr) {
    var copiedArray = arr.slice();

    var shuffledArray = copiedArray.sort(function () {

      return 0.5 - Math.random();
    });

    return shuffledArray;
  };

  return {
    getRandomNumber: getRandomNumber,
    getRandomItem: getRandomItem,
    checkIsEscEvent: checkIsEscEvent,
    checkIsEnterEvent: checkIsEnterEvent,
    getShuffledArray: getShuffledArray
  };
})();
