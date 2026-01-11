import {clearInnerHTML} from '../util.js';

const COMMENTS_PAGE = 5;
let currentPage = 0;
let allComments = [];

const bigPicture = document.querySelector('.big-picture');

const socialComment = bigPicture.querySelector('.social__comment');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');

const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const displayComments = () => {
  const startIndex = currentPage * COMMENTS_PAGE;
  const endIndex = startIndex + COMMENTS_PAGE;
  const currentCommentsToShow = allComments.slice(startIndex, endIndex);

  const fragmentSocialComments = document.createDocumentFragment();
  currentCommentsToShow.forEach((comment) => {
    const {avatar, name, message} = comment;
    const socialCommentTemplate = socialComment.cloneNode(true);

    socialCommentTemplate.querySelector('.social__picture').src = avatar;
    socialCommentTemplate.querySelector('.social__picture').alt = name;
    socialCommentTemplate.querySelector('.social__text').textContent = message;

    fragmentSocialComments.appendChild(socialCommentTemplate);
  });

  socialComments.appendChild(fragmentSocialComments);
  socialCommentShownCount.textContent = socialComments.children.length;
};

const checkHideButton = () => {
  if (socialComments.children.length >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  currentPage++;
  displayComments();
  checkHideButton();
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

const clearComments = () => {
  currentPage = 0;
  clearInnerHTML(socialComments);
  commentsLoader.classList.remove('hidden');
};

const renderComments = (currentPhoto) => {
  allComments = currentPhoto.comments;
  socialCommentTotalCount.textContent = allComments.length;

  currentPage = 0;

  displayComments();
  checkHideButton();
};

export {clearComments, renderComments, bigPicture, socialComments};
