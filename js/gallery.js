'use strict';
(function () {
  var onSuccess = function (photoObjects) {
    var blockPicturesContainer = document.querySelector('.pictures');
    blockPicturesContainer.querySelector('.picture').addEventListener('click', function () {
      window.preview(photoObjects[0]);
    });
  };

  window.backend.load(onSuccess, window.picture.onError);
})();
