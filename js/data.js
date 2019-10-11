'use strict';
(function () {
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

  var MAX_ID_AVATARS = 6;
  var MIN_ID_AVATARS = 1;
  var AMOUNT_PHOTOS = 25;
  var MAX_QUANTITY_COMMENTS = 5;
  var MIN_QUANTITY_COMMENTS = 1;
  var MAX_QUANTITY_LIKES = 200;
  var MIN_QUANTITY_LIKES = 15;

  var createComment = function () {
    var nameId = window.util.generateRandomId(NAMES);
    return {
      avatar: ('img/avatar-' + window.util.getRandomIntInclusive(MIN_ID_AVATARS, MAX_ID_AVATARS) + '.svg'),
      message: COMMENTS[window.util.generateRandomId(COMMENTS)],
      name: NAMES[nameId],
    };
  };

  var generatePhotoObject = function (index) {

    var photoComments = [];
    for (var j = 0; j < window.util.getRandomIntInclusive(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS); j++) {
      photoComments.push(createComment());
    }

    return {
      url: ('photos/' + (index + 1) + '.jpg'),
      description: DESC_PHOTOS[window.util.generateRandomId(DESC_PHOTOS)],
      likes: window.util.getRandomIntInclusive(MIN_QUANTITY_LIKES, MAX_QUANTITY_LIKES),
      quantityComments: photoComments.length,
      comments: photoComments,
    };
  };

  var photoObjects = [];
  for (var i = 0; i < AMOUNT_PHOTOS; i++) {
    photoObjects.push(generatePhotoObject(i));
  }

  window.data = photoObjects;
})();
