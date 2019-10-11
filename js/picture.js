'use strict';
(function () {
  var blockPictures = document.querySelector('.pictures');
  var similarUserPhotos = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderUserPhotos = function (descAndPhoto) {
    var userPhotosElement = similarUserPhotos.cloneNode(true);

    userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
    userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
    userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.quantityComments;

    return userPhotosElement;
  };

  var fragment = document.createDocumentFragment();
  for (var k = 0; k < window.data.length; k++) {
    fragment.appendChild(renderUserPhotos(window.data[k]));
  }

  blockPictures.appendChild(fragment);
})();
