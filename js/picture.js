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

  var renderUserPhotos = function (dataPhoto) {
    var similarUserPhotos = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    var renderPhoto = function (descAndPhoto) {
      var userPhotosElement = similarUserPhotos.cloneNode(true);

      userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
      userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
      userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.comments.length;

      return userPhotosElement;
    };
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataPhoto.length; i++) {
      fragment.appendChild(renderPhoto(dataPhoto[i]));
    }
    blockPictures.appendChild(fragment);
  };

  var updatePhotos = function (arr) {
    if (filterButtons[0].classList.contains('img-filters__button--active')) {
      console.log('Изначальный массив фото');
      console.log(arr);
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
      console.log('Обсуждаемый массив фото');
      console.log(discussedPhotosArr);
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

  var onSuccess = function (data) {
    var photoObjects = data; // Сохранила данные для дальнейшей фильтрации
    renderUserPhotos(photoObjects); //  Рендер списка фотографий с текущими данными
    filterBlock.classList.remove('img-filters--inactive'); // после загрузки страницы отображаются фильтры

    var onFilterClick = function (buttonsArr, index) {
      for (var i = 0; i < buttonsArr.length; i++) {
        if (buttonsArr[i].classList.contains('img-filters__button--active')) {
          buttonsArr[i].classList.remove('img-filters__button--active')
        }
      }
      buttonsArr[index].classList.add('img-filters__button--active');
      // Удаление старых данных
      // Рендер новых данных
      renderUserPhotos(updatePhotos(photoObjects));
    };

    filterButtons[1].addEventListener('click', function () {
      onFilterClick(filterButtons, 1);
    });
    filterButtons[2].addEventListener('click', function () {
      onFilterClick(filterButtons, 2);
    });
    filterButtons[0].addEventListener('click', function () {
      onFilterClick(filterButtons, 0);
    });
  };

  window.backend.load(onSuccess, onError);
  window.picture = {
    onError: onError,
  };
})();

// черновик

// ///////////////////////////////////// Проверка загруженных данных
//   blockPictures.querySelector('.picture__img').onload = function () {
//  console.log('загрузилось?');
// debugger
//   };

// instanceOfFileRequest.onprogress = function;
// request.onprogress = function (status) {
//   var progress = document.querySelector('progress');

//   progress.value = status.loaded;
//   progress.max   = status.total;
// }

// console.log(xhr.onprogress);
// if (onSuccess === true) {
//   console.log('данные загружены!');
// }
// /////////////////////////////////////////

// //   document.removeEventListener('keydown', onEditImageEscPress);
// // };

// // filterButton[popular].addEventListener('click', onFilterClick(popular));

// // //

// // //////////////////////////// Обновление фильтра, относительно активной кнопки

// // //////////////////////////

// 2. Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
//       Популярные — фотографии в изначальном порядке.
//
//
// 3. При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те,
//    которые подходят под новые условия.
// 4. Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так,
//    чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры,
//    происходило не чаще, чем один раз в 500 миллисекунд.
