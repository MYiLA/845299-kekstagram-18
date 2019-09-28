'use strict';
var amountPhotos = 25;
var maxQuantityComments = 5;
var minQuantityComments = 1;
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
    avatar: ('img/avatar-' + getRandomIntInclusive(1, 6) + '.svg'),
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
    likes: getRandomIntInclusive(15, 200),
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
  var temp = renderComments(obj.comments);
  blockBigPicture.querySelector('.social__comments').innerHTML = '';
  blockBigPicture.querySelector('.social__comments').appendChild(temp);
  blockBigPicture.querySelector('.social__comment-count').classList.add('hidden');
  blockBigPicture.querySelector('.comments-loader').classList.add('hidden');
};

renderBigPictures(photoObjects[0]);
