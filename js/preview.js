'use strict';
(function () {
  var MAX_COMMENTS_ARR = 5;

  var bigPictureElement = document.querySelector('.big-picture');
  var singleCommentElement = bigPictureElement.querySelector('.social__comment');
  var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

  var renderComments = function (arr) {
    var fragmentComment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var newComment = singleCommentElement.cloneNode(true);
      newComment.querySelector('.social__text').textContent = arr[i].message;
      newComment.querySelector('.social__picture').src = arr[i].avatar;
      newComment.querySelector('.social__picture').alt = arr[i].name;
      fragmentComment.appendChild(newComment);
    }
    return fragmentComment;
  };

  var showComments = function (arr) {
    if (arr.length > MAX_COMMENTS_ARR) {
      commentsLoaderElement.classList.remove('hidden');
      var shortCommentsArr = (arr.slice()).slice(0, MAX_COMMENTS_ARR);

      var onLoaderClick = function () {
        commentsLoaderElement.classList.add('hidden');
        shortCommentsArr = arr;
        window.util.removeOldChildrens('.social__comment');
        bigPictureElement.querySelector('.social__comments').appendChild(renderComments(shortCommentsArr));
        commentsLoaderElement.removeEventListener('click', onLoaderClick);
      };

      commentsLoaderElement.addEventListener('click', onLoaderClick);

      return shortCommentsArr;
    } else {
      commentsLoaderElement.classList.add('hidden');
      return arr;
    }
  };

  var renderBigPictures = function (obj) {
    bigPictureElement.classList.remove('hidden');
    bigPictureElement.querySelector('.big-picture__img img').src = obj.url;
    bigPictureElement.querySelector('.likes-count').textContent = obj.likes;
    bigPictureElement.querySelector('.comments-count').textContent = obj.quantityComments;
    bigPictureElement.querySelector('.social__caption').textContent = obj.description;
    bigPictureElement.querySelector('.social__comments').innerHTML = '';
    bigPictureElement.querySelector('.social__comments').appendChild(renderComments(showComments(obj.comments)));
    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');

    var buttonClozeElement = bigPictureElement.querySelector('#picture-cancel');
    buttonClozeElement.addEventListener('click', function () {
      bigPictureElement.classList.add('hidden');
    });

    var closeBigPicture = function () {
      bigPictureElement.classList.add('hidden');
      document.removeEventListener('keydown', onBigPictureEscPress);
    };

    var onBigPictureEscPress = function (evt) {
      if (evt.keyCode === window.util.KeyCodeButton.esc) {
        closeBigPicture();
      }
    };

    document.addEventListener('keydown', onBigPictureEscPress);
  };

  window.preview = renderBigPictures;

})();
