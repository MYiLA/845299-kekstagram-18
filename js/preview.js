'use strict';
(function () {
  var blockBigPicture = document.querySelector('.big-picture');
  var singleComment = document.querySelector('.social__comment');
  var renderComments = function (arr) {
    var fragmentComment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var newComment = singleComment.cloneNode(true);
      newComment.querySelector('.social__text').textContent = arr[i].message;
      newComment.querySelector('.social__picture').src = arr[i].avatar;
      newComment.querySelector('.social__picture').alt = arr[i].name;
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

    var buttonCloze = blockBigPicture.querySelector('#picture-cancel');
    buttonCloze.addEventListener('click', function () {
      blockBigPicture.classList.add('hidden');
    });

    var closeBigPicture = function () {
      blockBigPicture.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    };

    var onBigPictureEscPress = function (evt) {
      if (evt.keyCode === window.util.keyCodeButton.esc) {
        closeBigPicture();
      }
    };

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  window.preview = renderBigPictures;

})();
