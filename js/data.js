'use strict';
window.data = (function () {
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

  var maxIdAvatars = 6;
  var minIdAvatars = 1;
  var maxQuantityComments = 5;
  var minQuantityComments = 1;
  var maxQuantityLikes = 200;
  var minQuantityLikes = 15;

  var generateRandomId = function (arr) {
    var index = Math.round(Math.random() * (arr.length - 1));
    return index;
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  return {
    generatePhotoObject: generatePhotoObject
  };
})();
