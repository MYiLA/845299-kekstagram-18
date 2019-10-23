'use strict';
(function () {
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

  window.util = {
    generateRandomId: generateRandomId,
    getRandomIntInclusive: getRandomIntInclusive,
    keyCodeButton: keyCodeButton,
  };
})();
