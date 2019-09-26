'use strict';
var amountPhotos = 25;
var maxQuantityComments = 5;
var minQuantityComments = 1;
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

var similarUserPhotos = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var blockPictures = document.querySelector('.pictures');
var blockBigPicture = document.querySelector('.big-picture');
var blockMain = document.querySelector('main');
var blockSocialComments = document.querySelector('.social__comments');

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
  var surnameId = generateRandomId(SURNAMES);
  return {
    avatar: ('"img/avatar-' + getRandomIntInclusive(1, 6) + '.svg"'),
    message: COMMENTS[generateRandomId(COMMENTS)],
    name: NAMES[nameId] + ' ' + SURNAMES[surnameId],
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
    quantityComments: (photoComments.length + 1),

    // здесь нужно исправить счетчик видимых фотографий, пока не понимаю, как корректно их вставить в HTML
    visibleComments: ('2 из '),
    comments: photoComments,
  };
};

for (var i = 0; i < amountPhotos; i++) {
  descAndPhotos.push(generatePhotoObject(i));
}

// все моки вроде верно генерируются
console.log(descAndPhotos);

var renderUserPhotos = function (descAndPhoto) {
  var userPhotosElement = similarUserPhotos.cloneNode(true);

  userPhotosElement.querySelector('.picture__img').src = descAndPhoto.url;
  userPhotosElement.querySelector('.picture__likes').textContent = descAndPhoto.likes;
  userPhotosElement.querySelector('.picture__comments').textContent = descAndPhoto.quantityComments;

  return userPhotosElement;
};

// идея решения задачи с отрисовкой комментариев
// console.log(descAndPhotos[0].comments[0-5].name);
// console.log(descAndPhotos);

var fragment = document.createDocumentFragment();
for (var k = 0; k < amountPhotos; k++) {
  fragment.appendChild(renderUserPhotos(descAndPhotos[k]));
}

blockPictures.appendChild(fragment);

blockBigPicture.classList.remove('hidden');

// Здесь не получается в параметр функции задать "comment", так как он является объектом descAndPhotos[0]
var renderBigPictures = function (comment) {
  var bigPicturesElement = blockBigPicture.cloneNode(true);
  var socialCommentsElement = blockSocialComments.cloneNode(true)

  bigPicturesElement.querySelector('.big-picture__img img').src = descAndPhotos[0].url;
  bigPicturesElement.querySelector('.likes-count').textContent = descAndPhotos[0].likes;
  // Здесь я пыталась внести правки в счетчик видимых комментариев с помощью insertAdjacentHTML, но это не работает
  // bigPicturesElement.querySelector('.social__comment-count').insertAdjacentHTML('afterBegin', descAndPhoto.visibleComments);
  bigPicturesElement.querySelector('.comments-count').textContent = descAndPhotos[0].quantityComments;
  // Здесь я пыталась вставить комментарии с помощью innerHTML, но это не работает
  // bigPicturesElement.querySelector('.social__comments').innerHTML = renderComments();
  socialCommentsElement.querySelector('.social__picture').src = descAndPhotos[0].comment.avatar;
  socialCommentsElement.querySelector('.social__picture').alt = descAndPhotos[0].comment.name;
  socialCommentsElement.querySelector('.social__text').textContent = descAndPhotos[0].comment.message;
  bigPicturesElement.querySelector('.social__caption').textContent = descAndPhotos[0].description;
  return bigPicturesElement;
};

// У меня слишком много счетчиков(i j k имен уже не хватает). Возможно ли сократить их количество? я как понимаю со способом их объявления "var" каждому счетчику нужно обязательно давать уникальное имя.

// здесь не работает параметр "comments[l]", соответственно потому, что я не могу его передать в функцию "renderBigPictures"
for (var l = 0; l < maxQuantityComments; l++) {
  fragment.appendChild(renderBigPictures(comments[l]));
}

fragment.appendChild(renderBigPictures());


blockMain.appendChild(fragment);
