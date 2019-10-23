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

  function randomReshuffleArr(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  window.util = {
    generateRandomId: generateRandomId,
    getRandomIntInclusive: getRandomIntInclusive,
    keyCodeButton: keyCodeButton,
    randomReshuffleArr: randomReshuffleArr,
  };
})();
