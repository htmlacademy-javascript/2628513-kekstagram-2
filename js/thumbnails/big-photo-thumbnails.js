import {isEscapeKey,clearInnerHTML} from '../util.js';
import {containerPictures} from './thumbnails.js';
import {body} from '../show-error-message.js';
import {clearComments, renderComments, bigPicture,socialComments} from './render-comments-thumbnails.js';


const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');

const closeBigPicture = () => {
  clearComments();

  bigPicture.classList.add('hidden');
  // socialCommentCount.classList.remove('hidden'); // прячем блоки по заданию 8.14
  // commentsLoader.classList.remove('hidden'); // прячем блоки по заданию 8.14
  body.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

function onBigPictureCancelClick (event) {
  event.preventDefault();
  closeBigPicture();
}

function onBigPictureEscKeydown (event) {
  if(isEscapeKey(event)) {
    event.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (arr, pictureId) => {
  const currentPhoto = arr.find((element) => element.id === Number(pictureId));
  if (currentPhoto) {
    clearInnerHTML(socialComments);

    bigPictureImg.dataset.pictureId = currentPhoto.id;
    bigPictureImg.src = currentPhoto.url;
    socialCaption.textContent = currentPhoto.description;
    likesCount.textContent = currentPhoto.likes;

    renderComments(currentPhoto);

    bigPicture.classList.remove('hidden');//+
    // socialCommentCount.classList.add('hidden'); // прячем блоки по заданию 8.14
    // commentsLoader.classList.add('hidden'); // прячем блоки по заданию 8.14
    body.classList.add('modal-open');
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onBigPictureEscKeydown);
  }
};

const openBigPictureClick = (arr) => {
  containerPictures.addEventListener('click', (event) => {
    const currentPicture = event.target.closest('.picture');

    if(currentPicture) {
      event.preventDefault();
      openBigPicture(arr,currentPicture.dataset.pictureId);
    }
  });
};

export {openBigPictureClick};
