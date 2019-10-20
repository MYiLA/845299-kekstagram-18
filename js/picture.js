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

  window.backend.load(successHandler, errorHandler);
  

  // 1. После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него класс .img-filters--inactive
  // 2. Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
  //       Популярные — фотографии в изначальном порядке.
  //       Случайные — 10 случайных, не повторяющихся фотографий.
  //       Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  // 3. При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те,
  //    которые подходят под новые условия.
  // 4. Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так,
  //    чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры,
  //    происходило не чаще, чем один раз в 500 миллисекунд.

  window.picture = {
    errorHandler: errorHandler,
  };
})();

