'use strict';
(function () {
  var mainElement = document.querySelector('main');
  var closeErrorMessage = function () {
    var errorMessageElement = document.querySelector('.error');
    errorMessageElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', onErrorMessageClickClose);
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCodeButton.esc) {
      closeErrorMessage();
    }
  };

  var onErrorMessageClickClose = function () {
    closeErrorMessage();
  };

  var onError = function (errorMessage) {
    var similarErrorElement = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = similarErrorElement.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessageElement);
    mainElement.appendChild(fragment);
    var clozeButtonElement = document.querySelector('.error__button');
    clozeButtonElement.addEventListener('click', function () {
      closeErrorMessage();
    });
    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageClickClose);
    document.querySelector('.error__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  window.onError = onError;

})();
