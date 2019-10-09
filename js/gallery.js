'use strict';
(function () {
  var blockPicturesContainer = document.querySelector('.pictures');

  blockPicturesContainer.querySelector('.picture').addEventListener('click', function () {
    window.preview.renderBigPictures(window.picture.photoObjects[0]);
  });
})();
