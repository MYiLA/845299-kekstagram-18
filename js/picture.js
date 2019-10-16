'use strict';
(function () {
  var successHandler = function (photoObjects) {
    var blockPictures = document.querySelector('.pictures');
    var similarUserPhotos = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    var renderUserPhotos = function (descAndPhoto) {
      var userPhotosElement = similarUserPhotos.cloneNode(true);

      userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
      userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
      userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.comments.length;

      return userPhotosElement;
    };
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoObjects.length; i++) {
      fragment.appendChild(renderUserPhotos(photoObjects[i]));
    }
    blockPictures.appendChild(fragment);
  };

  var main = document.querySelector('main');
  var errorHandler = function (errorMessage) {
    var similarErrorMessage = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = similarErrorMessage.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessageElement);
    main.appendChild(fragment);
  };

  window.load(successHandler, errorHandler);
  window.picture = {
    errorHandler: errorHandler,
  };
})();
