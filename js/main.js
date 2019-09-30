'use strict';
var amountPhotos = 25;
var maxQuantityComments = 5;
var minQuantityComments = 1;
var maxQuantityLikes = 200;
var minQuantityLikes = 15;
var maxIdAvatars = 6;
var minIdAvatars = 1;
var photoObjects = [];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Иван',
  'Золтан',
  'Мария',
  'Крис',
  'Стас',
  'Юлия',
  'Серёга',
  'Витёк',
  'Марья',
  'Верон',
  'Белла',
  'Вальц',
  'Оно',
  'Борис',
  'Геракл'
];

var DESC_PHOTOS = [
  'Приветики',
  'Мы сделали это!',
  'Было непросто, но оно того стоило',
  'Типичный я',
  'Остаюсь верен традициям',
  'Жизнь предпринимателя',
  'Да, еще одно фото',
  'Если не сейчас, то когда? Если не я, то кто?',
  'Что вы об этом думаете?',
  'Не будь обычным, будь диким',
  'Угадайте, где я',
  'Что это было?',
  'Вторник – день вкусняшек',
  'Пытался сделать себяшку...',
];

var similarUserPhotos = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var blockPictures = document.querySelector('.pictures');
var blockBigPicture = document.querySelector('.big-picture');
var singleComment = document.querySelector('.social__comment');

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomId = function (arr) {
  var index = Math.round(Math.random() * (arr.length - 1));
  return index;
};

var createComment = function () {
  var nameId = generateRandomId(NAMES);
  return {
    avatar: ('img/avatar-' + getRandomIntInclusive(minIdAvatars, maxIdAvatars) + '.svg'),
    message: COMMENTS[generateRandomId(COMMENTS)],
    name: NAMES[nameId],
  };
};

var generatePhotoObject = function (index) {

  var photoComments = [];
  for (var j = 0; j < getRandomIntInclusive(minQuantityComments, maxQuantityComments); j++) {
    photoComments.push(createComment());
  }

  return {
    url: ('photos/' + (index + 1) + '.jpg'),
    description: DESC_PHOTOS[generateRandomId(DESC_PHOTOS)],
    likes: getRandomIntInclusive(minQuantityLikes, maxQuantityLikes),
    quantityComments: photoComments.length,
    comments: photoComments,
  };
};

for (var i = 0; i < amountPhotos; i++) {
  photoObjects.push(generatePhotoObject(i));
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

var renderComments = function (arr) {
  var fragmentComment = document.createDocumentFragment();
  for (var l = 0; l < arr.length; l++) {
    var newComment = singleComment.cloneNode(true);
    newComment.querySelector('.social__text').textContent = arr[l].message;
    newComment.querySelector('.social__picture').src = arr[l].avatar;
    newComment.querySelector('.social__picture').alt = arr[l].name;
    fragmentComment.appendChild(newComment);
  }
  return fragmentComment;
};

var renderBigPictures = function (obj) {
  blockBigPicture.classList.remove('hidden');
  blockBigPicture.querySelector('.big-picture__img img').src = obj.url;
  blockBigPicture.querySelector('.likes-count').textContent = obj.likes;
  blockBigPicture.querySelector('.comments-count').textContent = obj.quantityComments;
  blockBigPicture.querySelector('.social__caption').textContent = obj.description;
  blockBigPicture.querySelector('.social__comments').innerHTML = '';
  blockBigPicture.querySelector('.social__comments').appendChild(renderComments(obj.comments));
  blockBigPicture.querySelector('.social__comment-count').classList.add('hidden');
  blockBigPicture.querySelector('.comments-loader').classList.add('hidden');
};

// renderBigPictures(photoObjects[0]);


//
//
// /////////8. Личный проект: подробности//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//

var formEditImage = document.querySelector('.img-upload__overlay');
var btnUploadFile = document.querySelector('#upload-file');
var btnUploadCancel = formEditImage.querySelector('#upload-cancel ');
var pinEffect = formEditImage.querySelector('.effect-level__pin');
var positionPinEffect = parseFloat(window.getComputedStyle(pinEffect).left);
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onEditImageEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditImage();
  }
};

var openEditImage = function () {
  formEditImage.classList.remove('hidden');
  document.addEventListener('keydown', onEditImageEscPress);
};

var closeEditImage = function () {
  formEditImage.classList.add('hidden');
  document.removeEventListener('keydown', onEditImageEscPress);
};

// Изменение на элементе #upload-file вызывает функцию открытия попапа, которая
// убирает класс hidden у блока .img-upload__overlay
btnUploadFile.addEventListener('change', function () {
  openEditImage();
});

// Клик на элемент #upload-cancel или на клавишу Esc Вызывает функцию, которая: {
//   1) добавляет класс hidden у блока .img-upload__overlay,
//   2) (не реализовано) сбрасывает значение value поля блока #upload-file, чтобы можно было загрузить одну и ту же картинку несколько раз
//   3) удаляет обработчик Esc, так как он завязан на весь документ (внешний и невидимый)
// }

btnUploadCancel.addEventListener('click', function () {
  closeEditImage();
});

btnUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeEditImage();
  }
});

// ///////////////////////////////////
// 1. функция высчитывает уровень насыщенности фильтра по положению пина.
// данная логика работает при отпускании ползунка mouseup и при переключении слайда.
// принимает максимальное значение фильтра
// положение пина = свойство left у блока .effect-level__pin
var changesSaturation = function (maxFilter, positionPin) {
  return (positionPin * maxFilter) / 100;
};

// 2. Переключение слайдера: нужно совместить 2 списка объектов с одинаковыми id.
// и проверять импуты на checked при клике на область с фильтрами....
// если фильтр переключают, то positionPinEffect = 100 (сбрасывается значение ползунка на дефолт)
// При переключении фильтра, предыдущий добавленный класс фильтра удаляется/заменяется.
// Обработчик клика: при клике на .effects__preview--sepia
// добавляется класс фильтра на превью изображения .img-upload__preview и изменяется значение насыщенности фильтра(обработчик mouseup)
// через функцию changesSaturation(макс насыщенность фильтра, positionPinEffect)
// var switchesFilters () {
// Фильтры:

// «Хром»
// обработчик на блок: .effect-chrome
// Добавить классс: effects__preview--chrome
// CSS-свойство: filter: grayscale(0..1);

// «Сепия»
// обработчик на блок:
// Добавить классс:
// CSS-свойство filter: sepia(0..1);

// «Марвин»
// обработчик на блок:
// Добавить классс:
// CSS-свойство filter: invert(0..100%);

// «Фобос»
// обработчик на блок:
// Добавить классс:
// CSS-свойство filter: blur(0..3px);

// «Зной»
// обработчик на блок:
// Добавить классс:
// CSS-свойство filter: brightness(1..3);

// «Оригинал»
// обработчик на блок:
// Удалить классы фильтров

// 3. То же самое с размером, но ввести pinSize и positionPinSize
// При нажатии на стрелки(добавить обработчик по клику)
// плюс(.scale__control--bigger) и минус(.scale__control--smaller) 25 к счетчику размера .scale__control--value.
// нужно добавить в css стиль для превью .img-upload__preview,
// например transform: scale(0.75). Значение по-умолчанию: 1. шаг 0.25

// ////////////   ПРИМЕРЫ    ////////////////////
//
//
// Пример удаления обработчика по функци  с именем  on + объект + событие
// button.addEventListener('click', onButtonClick);

// Пример обнуления value
// function go() {
//   let zum = document.getElementById('addd').value;
//   document.getElementById('addd').value = '';
// }

// Пример завязки кнопки открытия на клавишу энтер
// setupOpen.addEventListener('keydown', function(evt) {
//   if (evt.keyCode === ENTER_KEYCODE) {
//     openPopup();
//   }
// });
// ////////////////////////////////////////////////////
