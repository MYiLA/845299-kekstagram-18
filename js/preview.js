'use strict';
(function () {
  var MAX_COMMENTS_ARR = 5;
  var blockBigPicture = document.querySelector('.big-picture');
  var singleComment = blockBigPicture.querySelector('.social__comment');
  var commentsLoader = blockBigPicture.querySelector('.comments-loader');
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

  var showComments = function (arr) {
    if (arr.length > MAX_COMMENTS_ARR) {
      commentsLoader.classList.remove('hidden');
      var shortCommentsArr = (arr.slice()).slice(0, MAX_COMMENTS_ARR);

      var onLoaderClick = function () {
        commentsLoader.classList.add('hidden');
        shortCommentsArr = arr;
        window.util.removeOldChildrens('.social__comment');
        blockBigPicture.querySelector('.social__comments').appendChild(renderComments(shortCommentsArr));
      };

      commentsLoader.addEventListener('click', onLoaderClick);

      return shortCommentsArr;
    } else {
      commentsLoader.classList.add('hidden');
      return arr;
    }
  };

  var renderBigPictures = function (obj) {
    blockBigPicture.classList.remove('hidden');
    blockBigPicture.querySelector('.big-picture__img img').src = obj.url;
    blockBigPicture.querySelector('.likes-count').textContent = obj.likes;
    blockBigPicture.querySelector('.comments-count').textContent = obj.quantityComments;
    blockBigPicture.querySelector('.social__caption').textContent = obj.description;
    blockBigPicture.querySelector('.social__comments').innerHTML = '';
    blockBigPicture.querySelector('.social__comments').appendChild(renderComments(showComments(obj.comments)));
    blockBigPicture.querySelector('.social__comment-count').classList.add('hidden');

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
