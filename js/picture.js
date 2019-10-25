'use strict';
(function () {
  var blockPictures = document.querySelector('.pictures');
  var filterBlock = document.querySelector('.img-filters');
  var popularFilter = document.querySelector('#filter-popular');
  var randomFilter = document.querySelector('#filter-random');
  var discussedFilter = document.querySelector('#filter-discussed');
  var filterButtons = [popularFilter, randomFilter, discussedFilter];

  var renderPhoto = function (descAndPhoto) {
    var similarUserPhotos = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    var userPhotosElement = similarUserPhotos.cloneNode(true);

    userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
    userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
    userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.comments.length;

    userPhotosElement.addEventListener('click', function () {
      window.preview(descAndPhoto);
    });

    return userPhotosElement;
  };

  var renderUserPhotos = window.util.debounce(function (dataPhoto) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataPhoto.length; i++) {
      fragment.appendChild(renderPhoto(dataPhoto[i]));
    }
    blockPictures.appendChild(fragment);
  });

  var updatePhotos = function (arr) {
    if (filterButtons[0].classList.contains('img-filters__button--active')) {
      return arr;
    }

    if (filterButtons[1].classList.contains('img-filters__button--active')) {
      var randomPhotosNumber = 10;
      var randomPhotosArr = window.util.randomReshuffleArr(arr.slice()).slice(0, randomPhotosNumber);
      return randomPhotosArr;
    }

    if (filterButtons[2].classList.contains('img-filters__button--active')) {
      var discussedPhotosArr = arr.slice().sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });

      return discussedPhotosArr;
    }
    return arr;
  };

  var onError = function (errorMessage) {
    var similarErrorMessage = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = similarErrorMessage.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessageElement);
    window.util.main.appendChild(fragment);
  };

  var removeOldPictures = window.util.debounce(function () {
    var pictures = document.querySelectorAll('.picture');
    if (pictures.length) {
      for (var i = 0; i < pictures.length; i++) {
        pictures[i].remove();
      }
    }
  });

  var onFilterClick = function (buttonsArr, index, photoObjects) {
    for (var i = 0; i < buttonsArr.length; i++) {
      if (buttonsArr[i].classList.contains('img-filters__button--active')) {
        buttonsArr[i].classList.remove('img-filters__button--active');
      }
    }
    buttonsArr[index].classList.add('img-filters__button--active');
    removeOldPictures();
    renderUserPhotos(updatePhotos(photoObjects));
  };

  var setupFilter = function (photoObjects) {
    filterBlock.classList.remove('img-filters--inactive');
    filterButtons[1].addEventListener('click', function () {
      onFilterClick(filterButtons, 1, photoObjects);
    });
    filterButtons[2].addEventListener('click', function () {
      onFilterClick(filterButtons, 2, photoObjects);
    });
    filterButtons[0].addEventListener('click', function () {
      onFilterClick(filterButtons, 0, photoObjects);
    });
  };

  var onSuccess = function (data) {
    var photoObjects = data;
    renderUserPhotos(photoObjects);
    setupFilter(photoObjects);
  };

  window.backend.load(onSuccess, onError);

})();
