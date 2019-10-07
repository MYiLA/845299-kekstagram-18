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

// /////////8. Личный проект: подробности//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
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
var photoEffects = [
  {
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
  }
];

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

var closeEditImage = function () {
  document.querySelector('#upload-select-image').reset();
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
  for (var m = 0; m < photoEffects.length; m++) {
    if (effectDefault.checked) {
      effectLevel.classList.add('hidden');
      prewiewUzerImage.style.filter = 'none';
    }
    if (!photoEffects[m].btnRadio.checked) {
      prewiewUzerImage.classList.remove(photoEffects[m].effectClass);
    }
    if (photoEffects[m].btnRadio.checked) {
      pinBlock.style.left = pinBlockDepth.style.width = '100%';
      effectLevel.classList.remove('hidden');
      prewiewUzerImage.classList.add(photoEffects[m].effectClass);
      actualPhotoEffect = {
        name: photoEffects[m].name,
        unit: photoEffects[m].unit,
        maxValue: photoEffects[m].maxValue,
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

// ///////////////////////////////////

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

// ///////////////////////////////////

var hashtagsInput = formEditImage.querySelector('.text__hashtags');
var space = ' ';
var hashtagsLimit = 5;
// добавить инпуты скрытые для значенийфильтров и степени их наложения, чтобы отправлять их на сервер?
var сommentInput = formEditImage.querySelector('.text__description');
var arrHashtags = hashtagsInput.value.split(space);
var validationComment = function () {
  if (сommentInput.validity.tooLong) {
    сommentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
  } else {
    сommentInput.setCustomValidity('');
  }
};
// первый символ у каждого элемента всегда #, между элементами всегда пробел
var result = [];
function unique(arr) {
  for (var n; n < arr.length; n++) {
    if (!result.includes(arr[n])) {
      result.push(arr[n]);
    }
  }
}
(unique(arrHashtags)
console.log(result);
// ^(#[A-zA-Z,0-9,А-Яа-яЁё]{1,19})(\s(#[A-zA-Z,0-9,А-Яа-яЁё]{1,19})){0,4}$
// var validateHashtagsPattern = function () {
//   for (var p; p < arrHashtags.length; p++) {
//   // проверить каждый хештег на соответствие паттерну и вывести сообщение об ошибке?
//   }
//   if (arrHashtags.length > hashtagsLimit) {
//     hashtagsInput.setCustomValidity('Нельзя указывать больше пяти хеш-тегов');
//   } else {
//     hashtagsInput.setCustomValidity('Хеш-теги разделяются пробелами');
//   }
// };

var validateHashtags = function () {
  // if (hashtagsInput.validity.valid) {
  //   // сюда написать условие о повторяющихся хештегах без учета регистра
  // } else
  if (hashtagsInput.validity.patternMismatch) {
    // validateHashtagsPattern();
    hashtagsInput.setCustomValidity('1.Нельзя указывать больше пяти хеш-тегов. 2.Хеш-теги разделяются пробелами. 3.Хеш-тег не может состоять из одного символа #. 4.Максимальная длина хештега равна 20 символов, включая решетку.');
  } else {
    hashtagsInput.setCustomValidity('');
  }
  console.log('Оригинальная строка: "' + hashtagsInput.value + '"');
  console.log('Разделитель: "' + space + '"');
  console.log('Массив содержит ' + arrHashtags.length + ' элементов: ' + arrHashtags.join(' / '));
};

сommentInput.addEventListener('invalid', function () {
  validationComment();
});

hashtagsInput.addEventListener('click', function () {
  validateHashtags();
});

//   Использовать встроенную проверку формы. Добавить атрибут инпуту: pattern
//  Проверить инпут на валидность ValidityState строка valid
// 4. Выполнить валидацию хеш-тегов. {
//     1) придётся вспомнить как работать с массивами:
//        Набор хэш-тегов можно превратить в массив, воспользовавшись методом split.
//        Он разбивает строки на массивы.
//     2) написать цикл, который будет ходить по полученному массиву и проверять
//        каждый из хэш-тегов на ограничения: {
//        - хештеги не обязательны убрать "обязательность"?
//        - начинаются с символа #
//          pattern-атрибут
//        - не может состоять только из одной решетки 
//          pattern-атрибут
//          Объект-проверка ValidityState строка tooShort
//        - хештеги разделяются пробелами
//          pattern-атрибут
//        - один и тот же хештег не может быть использован дважды
//        - нельзя указать больше пяти хештегов
//          Объект-проверка ValidityState строка rangeOverflow
//        - максимальная длина хештега 20 символов, включая решетку
//          max-атрибут
//          Объект-проверка ValidityState строка tooLong
//        - теги не чувствительны к регистру
//       }
//     3) Если хотя бы один из тегов не проходит нужных проверок, можно воспользоваться
//        методом setCustomValidity для того, чтобы задать полю правильное сообщение об ошибке
//        у соответствующего поля. Все пункты ошибок выводятся одним сообщением, как в 
//        https://htmlacademy.ru/blog/useful/html/form-validation-techniques
//     4) если фокус находится в поле ввода хэш-тега,
//        нажатие на Esc не должно приводить к закрытию формы редактирования изображения


// ////////////   ПРИМЕРЫ    ////////////////////
// проверка строки регулярным выражением, возвращает тру или фолс
//  /regular/.test(str);
//
// Вывод уникального значения из массива
// function unique(arr) {
//   let result = [];

//   for (let str of arr) {
//     if (!result.includes(str)) {
//       result.push(str);
//     }
//   }

//   return result;
// }
//
//  Пример вставки рандомных подсказок по валидации
// сommentInput.addEventListener('invalid', function () {
//   if (сommentInput.validity.tooLong) {
//     сommentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
//   } else if (сommentInput.validity.tooShort) {
//     сommentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
//   } else {
//     сommentInput.setCustomValidity('');
//   }
// });
//
// Пример создания своей валидации
// userNameInput.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value.length < 2) {
//     target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
//   } else {
//     target.setCustomValidity('');
//   }
// });
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
