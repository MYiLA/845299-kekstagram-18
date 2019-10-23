'use strict';
(function () {
  var blockPictures = document.querySelector('.pictures');
  var filterBlock = document.querySelector('.img-filters');
  var popularFilter = document.querySelector('#filter-popular');
  var randomFilter = document.querySelector('#filter-random');
  var discussedFilter = document.querySelector('#filter-discussed');
  var filterButtons = [popularFilter, randomFilter, discussedFilter];

  // Переключение фильтра. универсальная функция нажатия на кнопку


  // слушатели по клику нажатия на кнопки

  // попытка рефакторинга тоггла
  // var FilterToggle = function (buttonsArr) {
  //   for (var i = 0; i < buttonsArr.length; i++) {
  //     filterButtons[i].addEventListener('click', function () {
  //       onFilterClick(filterButtons, i);
  //     });
  //   }
  // };

  // FilterToggle(filterButtons);

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

  var renderUserPhotos = function (dataPhoto) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataPhoto.length; i++) {
      fragment.appendChild(renderPhoto(dataPhoto[i]));
    }
    blockPictures.appendChild(fragment);
  };

  var updatePhotos = function (arr) {
    if (filterButtons[0].classList.contains('img-filters__button--active')) {
      return arr;
    }
    if (filterButtons[1].classList.contains('img-filters__button--active')) { // Случайные — 10 случайных, не повторяющихся фотографий.
      var randomPhotosArr = arr;
      // 1. отфильтровать случайно индексы (mathRandom) из 25 элементов, создать из них массив без повторов и обрезать массив
      // 2. перемешать случайно индексы через sort и обрезать (возможно ли это сделать?)
      //   var randomPhotosArr = arr.filter
      //   return randomPhotosArr;
      console.log('Рандомный массив фото');
      console.log(randomPhotosArr);
      return randomPhotosArr;
    }
    if (filterButtons[2].classList.contains('img-filters__button--active')) { // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
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
  };

  var main = document.querySelector('main');
  var onError = function (errorMessage) {
    var similarErrorMessage = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = similarErrorMessage.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessageElement);
    main.appendChild(fragment);
  };

  var removeOldPictures = function () {
    var pictures = document.querySelectorAll('.picture');
    if (pictures.length) {
      for (var i = 0; i < pictures.length; i++) {
        pictures[i].remove();
      }
    }
  };

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

// черновик

// Фильтр. Функция, которая перемешивает элементы в массиве
// взять первые 10 элементов ( обрезать слайсом)

// Дребезжание. 1. в util обернуть функцию, которую необходимо замедлить.
// 2. Не забыть удалить лишние точки слежения.

// 4. Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так,
//    чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры,
//    происходило не чаще, чем один раз в 500 миллисекунд.
