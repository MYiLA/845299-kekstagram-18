'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;

  var removeOldChildrens = function (childrensClass) {
    var childrens = document.querySelectorAll(childrensClass);
    if (childrens.length) {
      for (var i = 0; i < childrens.length; i++) {
        childrens[i].remove();
      }
    }
  };

  var generateRandomId = function (arr) {
    var index = Math.round(Math.random() * (arr.length - 1));
    return index;
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var keyCodeButton = {
    esc: 27,
    enter: 13,
  };

  function randomReshuffleArr(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    generateRandomId: generateRandomId,
    getRandomIntInclusive: getRandomIntInclusive,
    keyCodeButton: keyCodeButton,
    randomReshuffleArr: randomReshuffleArr,
    debounce: debounce,
    removeOldChildrens: removeOldChildrens,
  };
})();
