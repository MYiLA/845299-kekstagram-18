'use strict';
(function () {
  var ZOOM_DEFAULT = 100;
  var HUNDRED_PERCENT = 100;
  var PIN_MAX_POSITION = 452;
  var PIN_MIN_POSITION = 0;
  var ZOOM_STEP = 25;
  var ZOOM_MAX = 100;
  var ZOOM_MIN = 25;
  var HASHTAGS_LIMIT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  var editImageElement = document.querySelector('.img-upload__overlay');
  var btnUploadElement = document.querySelector('#upload-file');
  var btnCancelElement = editImageElement.querySelector('#upload-cancel');
  var pinElement = editImageElement.querySelector('.effect-level__pin');
  var pinDepthElement = editImageElement.querySelector('.effect-level__depth');
  var prewiewImageElement = editImageElement.querySelector('.img-upload__preview');
  var mainElement = document.querySelector('main');

  var photoEffects = [
    {
      name: 'grayscale',
      unit: '',
      maxValue: 1,
      effectClass: 'effects__preview--chrome',
      btnRadioElement: editImageElement.querySelector('#effect-chrome'),
    },
    {
      name: 'sepia',
      unit: '',
      maxValue: 1,
      effectClass: 'effects__preview--sepia',
      btnRadioElement: editImageElement.querySelector('#effect-sepia'),
    },
    {
      name: 'invert',
      unit: '%',
      maxValue: 100,
      effectClass: 'effects__preview--marvin',
      btnRadioElement: editImageElement.querySelector('#effect-marvin'),
    },
    {
      name: 'blur',
      unit: 'px',
      maxValue: 3,
      effectClass: 'effects__preview--phobos',
      btnRadioElement: editImageElement.querySelector('#effect-phobos'),
    },
    {
      name: 'brightness',
      unit: '',
      maxValue: 3,
      effectClass: 'effects__preview--heat',
      btnRadioElement: editImageElement.querySelector('#effect-heat'),
    }
  ];

  var addDefoltEffect = function () {
    effectDefaultElement.checked = true;
    effectLevelElement.classList.add('hidden');
    prewiewImageElement.style.filter = 'none';
  };

  var onEditImageEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.esc) {
      closeEditImage();
    }
  };

  var openEditImage = function () {
    editImageElement.classList.remove('hidden');
    effectLevelElement.classList.add('hidden');
    document.addEventListener('keydown', onEditImageEscPress);
    prewiewImageElement.style.transform = 'scale(' + (ZOOM_DEFAULT / HUNDRED_PERCENT) + ')';
    zoomValueElement.value = ZOOM_DEFAULT + '%';
  };

  var formElement = document.querySelector('#upload-select-image');

  var closeEditImage = function () {
    formElement.reset();
    editImageElement.classList.add('hidden');
    zoomValueElement.value = ZOOM_DEFAULT + '%';
    prewiewImageElement.style.transform = 'scale(' + (ZOOM_DEFAULT / HUNDRED_PERCENT) + ')';
    addDefoltEffect();
    document.removeEventListener('keydown', onEditImageEscPress);
  };

  btnUploadElement.addEventListener('change', function () {
    openEditImage();
  });

  btnCancelElement.addEventListener('click', function () {
    closeEditImage();
  });

  btnCancelElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.enter) {
      closeEditImage();
    }
  });

  var changesSaturationFilter = function (maxFilter) {
    var positionPin = parseFloat(pinElement.style.left);
    return (positionPin * maxFilter) / PIN_MAX_POSITION;
  };

  var effectLevelElement = editImageElement.querySelector('.effect-level');
  var allEffectElement = editImageElement.querySelector('.effects__list');
  var effectDefaultElement = editImageElement.querySelector('#effect-none');
  var actualPhotoEffect = {
    name: 'none',
    unit: '',
    maxValue: 0,
  };

  var renderPhotoEffect = function () {
    var effectSaturation = changesSaturationFilter(actualPhotoEffect.maxValue);
    prewiewImageElement.style.filter = actualPhotoEffect.name + '(' + effectSaturation + actualPhotoEffect.unit + ')';
  };

  var addEffect = function () {
    for (var b = 0; b < photoEffects.length; b++) {
      if (effectDefaultElement.checked) {
        addDefoltEffect();
      }
      if (!photoEffects[b].btnRadioElement.checked) {
        prewiewImageElement.classList.remove(photoEffects[b].effectClass);
      }
      if (photoEffects[b].btnRadioElement.checked) {
        pinElement.style.left = pinDepthElement.style.width = PIN_MAX_POSITION + 'px';
        effectLevelElement.classList.remove('hidden');
        prewiewImageElement.classList.add(photoEffects[b].effectClass);
        actualPhotoEffect = {
          name: photoEffects[b].name,
          unit: photoEffects[b].unit,
          maxValue: photoEffects[b].maxValue,
        };
        renderPhotoEffect();
      }
    }
  };

  allEffectElement.addEventListener('click', function () {
    addEffect();
  });

  pinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinate = evt.clientX;
    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoordinate - moveEvt.clientX;
      startCoordinate = moveEvt.clientX;
      if ((pinElement.offsetLeft - shift) >= PIN_MIN_POSITION && (pinElement.offsetLeft - shift) <= PIN_MAX_POSITION) {
        pinElement.style.left = (pinElement.offsetLeft - shift) + 'px';
        pinDepthElement.style.width = changesSaturationFilter(HUNDRED_PERCENT) + '%';
      } else {
        onPinMouseUp();
      }
    };

    var onPinMouseUp = function () {
      renderPhotoEffect();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });

  var zoomInControlElement = editImageElement.querySelector('.scale__control--bigger');
  var zoomOutElement = editImageElement.querySelector('.scale__control--smaller');
  var zoomValueElement = editImageElement.querySelector('.scale__control--value');

  var zoomChange = function (zoomStepVar) {
    zoomOutElement.disabled = false;
    zoomInControlElement.disabled = false;
    zoomValueElement.value = parseFloat(zoomValueElement.value) + zoomStepVar + '%';
    prewiewImageElement.style.transform = 'scale(' + (parseFloat(zoomValueElement.value) / HUNDRED_PERCENT) + ')';
  };

  var zoomInChange = function () {
    if (parseFloat(zoomValueElement.value) === ZOOM_MAX) {
      zoomInControlElement.disabled = true;
    } else {
      zoomChange(ZOOM_STEP);
    }
  };

  var zoomOutChange = function () {
    if ((parseFloat(zoomValueElement.value)) === ZOOM_MIN) {
      zoomOutElement.disabled = true;
    } else {
      zoomChange(-ZOOM_STEP);
    }
  };

  zoomInControlElement.addEventListener('click', function () {
    zoomInChange();
  });

  zoomOutElement.addEventListener('click', function () {
    zoomOutChange();
  });

  var hashtagsElement = editImageElement.querySelector('.text__hashtags');
  var сommentElement = editImageElement.querySelector('.text__description');
  var formSubmitElement = formElement.querySelector('#upload-submit');

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
      hashtagsElement.setCustomValidity('Нельзя указывать больше пяти хеш-тегов.');
      return false;
    }

    for (var c = 0; c < hashtags.length; c++) {
      if (hashtags[c][0] !== '#') {
        hashtagsElement.setCustomValidity('Хеш-тег начинается с символа # (решётка).');
        return false;
      }
    }

    for (var d = 0; d < hashtags.length; d++) {
      if (!hashtags[d][1]) {
        hashtagsElement.setCustomValidity('Хеш-тег не может состоять только из одной решётки.');
        return false;
      }
    }

    for (var g = 0; g < hashtags.length; g++) {
      var res = hashtags[g].match(/#/g);
      if (res.length > 1) {
        hashtagsElement.setCustomValidity('Хеш-теги разделяются пробелами.');
        return false;
      }
    }

    for (var e = 0; e < hashtags.length; e++) {
      if (hashtags[e].length > MAX_HASHTAG_LENGTH) {
        hashtagsElement.setCustomValidity('Максимальная длина одного хеш-тега 20 символов, включая решетку.');
        return false;
      }
    }

    if (!verifyDuplicates(hashtags)) {
      hashtagsElement.setCustomValidity('Один и тот же хештег не может быть использован дважды.');
      return false;
    } else {
      hashtagsElement.setCustomValidity('');
      return true;
    }
  };

  var showSuccessMessage = function () {
    closeEditImage();
    var similarSuccessElement = document.querySelector('#success')
        .content
        .querySelector('.success');
    var successMessageElement = similarSuccessElement.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(successMessageElement);
    mainElement.appendChild(fragment);
    var clozeElement = mainElement.querySelector('.success__button');
    clozeElement.addEventListener('click', function () {
      closeSuccessMessage();
    });
    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageClickClose);
    document.querySelector('.success__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.esc) {
      closeSuccessMessage();
    }
  };

  var onSuccessMessageClickClose = function () {
    closeSuccessMessage();
  };

  var closeSuccessMessage = function () {
    var successMessageElement = document.querySelector('.success');
    successMessageElement.remove();
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageClickClose);
  };

  var addRedFrame = function (validityCheck, inputBlock) {
    if (!validityCheck) {
      inputBlock.style.boxShadow = '0 0 0 6px rgba(223, 30, 30, 0.9)';
    } else {
      inputBlock.style.boxShadow = 'none';
    }
  };

  var showErrorMessage = function (errorMessage) {
    closeEditImage();
    window.onError(errorMessage);
  };

  formSubmitElement.addEventListener('click', function (evt) {
    evt.preventDefault();
    var hashtagsArr = hashtagsElement.value.split(' ');
    var isValid = checkHashtagsValidity(hashtagsArr) && checkCommentValidity(сommentElement);
    if (isValid) {
      window.backend.upload(new FormData(formElement), showSuccessMessage, showErrorMessage);
    } else {
      hashtagsElement.reportValidity();
      сommentElement.reportValidity();
      addRedFrame(checkHashtagsValidity(hashtagsArr), hashtagsElement);
      addRedFrame(checkCommentValidity(сommentElement), сommentElement);
    }
  });

  hashtagsElement.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  сommentElement.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

})();
