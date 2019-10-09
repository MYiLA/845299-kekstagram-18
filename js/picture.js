'use strict';
window.picture = (function () {
  var amountPhotos = 25;
  var photoObjects = [];

  var similarUserPhotos = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var blockPictures = document.querySelector('.pictures');
  for (var i = 0; i < amountPhotos; i++) {
    photoObjects.push(window.data.generatePhotoObject(i));
  }

  var renderUserPhotos = function (descAndPhoto) {
    var userPhotosElement = similarUserPhotos.cloneNode(true);

    userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
    userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
    userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.quantityComments;

    return userPhotosElement;
  };

  var fragment = document.createDocumentFragment();
  for (var k = 0; k < amountPhotos; k++) {
    fragment.appendChild(renderUserPhotos(photoObjects[k]));
  }

  blockPictures.appendChild(fragment);

  return {
    photoObjects: photoObjects
  };
})();
