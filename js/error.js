'use strict';
(function () {
  var main = document.querySelector('main');
  var closeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
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
    var similarErrorMessage = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorMessageElement = similarErrorMessage.cloneNode(true);
    errorMessageElement.querySelector('.error__title').textContent = errorMessage;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorMessageElement);
    main.appendChild(fragment);
    var clozeButton = document.querySelector('.error__button');
    clozeButton.addEventListener('click', function () {
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
