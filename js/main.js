'use strict';
var amountPhotos = 25;
var descAndPhotos = [];
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
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
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

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var generateRandomId = function (arr) {
  var index = Math.round(Math.random() * (arr.length - 1));
  return index;
};

var similarListElement = document.querySelector('.big-picture__social');

var similarUserPhotos = document.querySelector('#picture')
    .content
    .querySelector('.picture');

for (var i = 0; i < amountPhotos; i++) {
  var PHOTO_COMMENTS = [];
  var createComments = function () {
    var nameId = generateRandomId(NAMES);
    var surnameId = generateRandomId(SURNAMES);
    return {
      avatar: ('"img/avatar-' + getRandomIntInclusive(1, 6) + '.svg"'),
      message: COMMENTS[generateRandomId(COMMENTS)],
      name: NAMES[nameId] + ' ' + SURNAMES[surnameId],
    };
  };
  for (var j = 0; j < getRandomIntInclusive(1, 5); j++) {
    PHOTO_COMMENTS[j] = createComments();
  }
  descAndPhotos[i] = {
    url: ('photos/' + (i + 1) + '.jpg'),
    description: DESC_PHOTOS[generateRandomId(DESC_PHOTOS)],
    likes: getRandomIntInclusive(15, 200),
    comments: (PHOTO_COMMENTS.length + 1),
  };
}

var renderUserPhotos = function (descAndPhoto) {
  var userPhotosElement = similarUserPhotos.cloneNode(true);

  userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
  userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
  userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.comments;

  return userPhotosElement;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < amountPhotos; k++) {
  fragment.appendChild(renderUserPhotos(descAndPhotos[k]));
}
similarListElement.appendChild(fragment);

document.querySelector('.big-picture').classList.remove('hidden');
