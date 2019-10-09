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
var blockPicturesContainer = document.querySelector('.pictures');

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
  for (var a = 0; a < arr.length; a++) {
    var newComment = singleComment.cloneNode(true);
    newComment.querySelector('.social__text').textContent = arr[a].message;
    newComment.querySelector('.social__picture').src = arr[a].avatar;
    newComment.querySelector('.social__picture').alt = arr[a].name;
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


blockPicturesContainer.querySelector('.picture').addEventListener('click', function () {
  renderBigPictures(photoObjects[0]);
});

var zoomDefault = 100;
var HUNDRED_PERCENT = 100;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var formEditImage = document.querySelector('.img-upload__overlay');
var btnUploadFile = document.querySelector('#upload-file');
var btnUploadCancel = formEditImage.querySelector('#upload-cancel');
var pinBlock = formEditImage.querySelector('.effect-level__pin');
var pinBlockDepth = formEditImage.querySelector('.effect-level__depth');
var prewiewUzerImage = formEditImage.querySelector('.img-upload__preview');
var photoEffects = [{
  name: 'grayscale',
  unit: '',
  maxValue: 1,
  effectClass: 'effects__preview--chrome',
  btnRadio: formEditImage.querySelector('#effect-chrome'),
},
{
  name: 'sepia',
  unit: '',
  maxValue: 1,
  effectClass: 'effects__preview--sepia',
  btnRadio: formEditImage.querySelector('#effect-sepia'),
},
{
  name: 'invert',
  unit: '%',
  maxValue: 100,
  effectClass: 'effects__preview--marvin',
  btnRadio: formEditImage.querySelector('#effect-marvin'),
},
{
  name: 'blur',
  unit: 'px',
  maxValue: 3,
  effectClass: 'effects__preview--phobos',
  btnRadio: formEditImage.querySelector('#effect-phobos'),
},
{
  name: 'brightness',
  unit: '',
  maxValue: 3,
  effectClass: 'effects__preview--heat',
  btnRadio: formEditImage.querySelector('#effect-heat'),
}];

var onEditImageEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditImage();
  }
};

var openEditImage = function () {
  formEditImage.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onEditImageEscPress);
  prewiewUzerImage.style.transform = 'scale(' + (zoomDefault / HUNDRED_PERCENT) + ')';
  zoomValue.value = zoomDefault + '%';
};

var form = document.querySelector('#upload-select-image');

var closeEditImage = function () {
  form.reset();
  formEditImage.classList.add('hidden');
  document.removeEventListener('keydown', onEditImageEscPress);
};

btnUploadFile.addEventListener('change', function () {
  openEditImage();
});

btnUploadCancel.addEventListener('click', function () {
  closeEditImage();
});

btnUploadCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeEditImage();
  }
});

var changesSaturationFilter = function (maxFilter) {
  var positionPin = parseFloat(pinBlock.style.left);
  return (positionPin * maxFilter) / HUNDRED_PERCENT;
};

var effectLevel = formEditImage.querySelector('.effect-level');
var allEffectBlock = formEditImage.querySelector('.effects__list');
var effectDefault = formEditImage.querySelector('#effect-none');
var actualPhotoEffect = {
  name: 'none',
  unit: '',
  maxValue: 0,
};

var renderPhotoEffect = function () {
  var effectSaturation = changesSaturationFilter(actualPhotoEffect.maxValue);
  prewiewUzerImage.style.filter = actualPhotoEffect.name + '(' + effectSaturation + actualPhotoEffect.unit + ')';
};

var addEffect = function () {
  for (var b = 0; b < photoEffects.length; b++) {
    if (effectDefault.checked) {
      effectLevel.classList.add('hidden');
      prewiewUzerImage.style.filter = 'none';
    }
    if (!photoEffects[b].btnRadio.checked) {
      prewiewUzerImage.classList.remove(photoEffects[b].effectClass);
    }
    if (photoEffects[b].btnRadio.checked) {
      pinBlock.style.left = pinBlockDepth.style.width = '100%';
      effectLevel.classList.remove('hidden');
      prewiewUzerImage.classList.add(photoEffects[b].effectClass);
      actualPhotoEffect = {
        name: photoEffects[b].name,
        unit: photoEffects[b].unit,
        maxValue: photoEffects[b].maxValue,
      };
      renderPhotoEffect();
    }
  }
};

allEffectBlock.addEventListener('click', function () {
  addEffect();
});

var onPinMouseup = function () {
  pinBlock.style.left = pinBlockDepth.style.width = '50%';
  renderPhotoEffect();
};

pinBlock.addEventListener('mouseup', onPinMouseup);

var zoomInControl = formEditImage.querySelector('.scale__control--bigger');
var zoomOutControl = formEditImage.querySelector('.scale__control--smaller');
var zoomValue = formEditImage.querySelector('.scale__control--value');
var zoomStep = 25;
var zoomMax = 100;
var zoomMin = 25;

var zoomChange = function (zoomStepVar) {
  zoomOutControl.disabled = false;
  zoomInControl.disabled = false;
  zoomValue.value = parseFloat(zoomValue.value) + zoomStepVar + '%';
  prewiewUzerImage.style.transform = 'scale(' + (parseFloat(zoomValue.value) / HUNDRED_PERCENT) + ')';
};

var zoomInChange = function () {
  if (parseFloat(zoomValue.value) === zoomMax) {
    zoomInControl.disabled = true;
  } else {
    zoomChange(zoomStep);
  }
};

var zoomOutChange = function () {
  if ((parseFloat(zoomValue.value)) === zoomMin) {
    zoomOutControl.disabled = true;
  } else {
    zoomChange(-zoomStep);
  }
};

zoomInControl.addEventListener('click', function () {
  zoomInChange();
});

zoomOutControl.addEventListener('click', function () {
  zoomOutChange();
});

var hashtagsInput = formEditImage.querySelector('.text__hashtags');
var HASHTAGS_LIMIT = 5;
var MAX_HASHTAG_LENGTH = 20;
var MAX_COMMENT_LENGTH = 140;
var сommentInput = formEditImage.querySelector('.text__description');
var formSubmitBtn = form.querySelector('#upload-submit');

function verifyDuplicates(arr) {
  var f;
  var result = [];
  for (f = 0; f < arr.length; f++) {
    if (!result.includes(arr[f].toLowerCase())) {
      result.push(arr[f].toLowerCase());
    }
  }
  if (arr.length === result.length) {
    return true;
  }
  return false;
}

var checkCommentValidity = function (commentBlock) {
  if (commentBlock.value.length > MAX_COMMENT_LENGTH) {
    commentBlock.setCustomValidity('Длина комментария не должна превышать 140 символов');
    return false;
  } else {
    commentBlock.setCustomValidity('');
    return true;
  }
};

var checkHashtagsValidity = function (hashtags) {
  if (hashtags.length === 1 && hashtags[0] === '') {
    return true;
  }

  if (hashtags.length > HASHTAGS_LIMIT) {
    hashtagsInput.setCustomValidity('Нельзя указывать больше пяти хеш-тегов.');
    return false;
  }

  for (var c = 0; c < hashtags.length; c++) {
    if (hashtags[c][0] !== '#') {
      hashtagsInput.setCustomValidity('Хеш-тег начинается с символа # (решётка).');
      return false;
    }
  }

  for (var d = 0; d < hashtags.length; d++) {
    if (!hashtags[d][1]) {
      hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
      return false;
    }
  }

  for (var g = 0; g < hashtags.length; g++) {
    var res = hashtags[g].match(/#/g);
    if (res.length > 1) {
      hashtagsInput.setCustomValidity('Хеш-теги разделяются пробелами.');
      return false;
    }
  }

  for (var e = 0; e < hashtags.length; e++) {
    if (hashtags[e].length > MAX_HASHTAG_LENGTH) {
      hashtagsInput.setCustomValidity('Максимальная длина одного хеш-тега 20 символов, включая решетку.');
      return false;
    }
  }

  if (!verifyDuplicates(hashtags)) {
    hashtagsInput.setCustomValidity('Один и тот же хештег не может быть использован дважды.');
    return false;
  } else {
    hashtagsInput.setCustomValidity('');
    return true;
  }
};

formSubmitBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  var hashtagsArr = hashtagsInput.value.split(' ');
  var isValid = checkHashtagsValidity(hashtagsArr) && checkCommentValidity(сommentInput);
  if (isValid) {
    form.submit();
  } else {
    hashtagsInput.reportValidity();
    сommentInput.reportValidity();
  }
});

hashtagsInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

сommentInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

