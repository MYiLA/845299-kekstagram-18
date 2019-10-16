'use strict';
(function () {
  var successHandler = function (photoObjects) {
    var blockPicturesContainer = document.querySelector('.pictures');
    blockPicturesContainer.querySelector('.picture').addEventListener('click', function () {
      window.preview(photoObjects[0]);
    });
  };

  window.load(successHandler, window.picture.errorHandler);
})();
