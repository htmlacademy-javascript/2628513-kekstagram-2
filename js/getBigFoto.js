/* eslint-disable no-use-before-define */
import {clearInnerHTML} from './thumbnails.js';

const bigPicture = document.querySelector('.big-picture');//большое фото
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');// крестик на большом фото

const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const socialCaption = bigPicture.querySelector('.social__caption');// описание фото
const likesCount = bigPicture.querySelector('.likes-count');// кол-во лайков

const socialComment = bigPicture.querySelector('.social__comment');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // Количество показанных комментариев++
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count'); // Общее количество комментариев к фотографии++

const socialComments = bigPicture.querySelector('.social__comments');// блок с комментариями ввиде списка
const commentsLoader = bigPicture.querySelector('.comments-loader');//кнопка загрузки новых  комментариев
// const socialCommentCount = bigPicture.querySelector('.social__comment-count');//(не надо)

const commentsPage = 5; // Определенное количество комментариев для загрузки за раз
let currentPage = 0; // Текущая пачка комментариев
let allComments = [];

const isEscapeKey = (event) => event.key === 'Escape';

const displayComments = () => {
  // Вычисляем, с какого и по какой комментарий показывать
  const startIndex = currentPage * commentsPage;
  const endIndex = startIndex + commentsPage;

  const currentCommentsToShow = allComments.slice(startIndex, endIndex);// получаем часть массива для текущей страницы

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

  socialCommentShownCount.textContent = socialComments.children.length;//обновляем счетчик показанных комментариев
};

const checkHideButton = () => { // ф-ия для проверки, нужно ли скрывать кнопку
  if (socialComments.children.length >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {//обработчик загрузки комментариев
  currentPage++; // Переходим к следующей "странице"
  displayComments(); // Показываем следующую порцию комментариев
  checkHideButton(); // После добавления снова проверяем, нужно ли скрыть кнопку
};

const onBigPictureCancelClick = (event) => {
  event.preventDefault();
  closeBigPicture();
};

const onBigPictureEscKeydown = (event) => {//обработчик события нажатие в модал окно клавиши esc
  if(isEscapeKey(event)) {
    event.preventDefault();
    closeBigPicture();
  }
};

const closeBigPicture = () => {

  bigPicture.classList.add('hidden');//+
  // socialCommentCount.classList.remove('hidden'); // прячем блоки по заданию 8.14
  // commentsLoader.classList.remove('hidden'); // прячем блоки по заданию 8.14
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick); // снять обработчик с крестика
  document.removeEventListener('keydown', onBigPictureEscKeydown);// снять обработчик с эскейпа
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);// удаляем обработчик с кнопки загрузки при закрытии
};

const openBigPicture = (arr, pictureId) => {
  const currentPhoto = arr.find((element) => element.id === Number(pictureId));
  if (currentPhoto) {
    currentPage = 0;// cбрасываем состояние для новой фотографии
    bigPictureImg.dataset.pictureId = currentPhoto.id;//важно связь между фото pichtureId
    bigPictureImg.src = currentPhoto.url;
    socialCaption.textContent = currentPhoto.description;
    likesCount.textContent = currentPhoto.likes;
    // socialCommentShownCount.textContent = currentPhoto.comments.length;
    // socialCommentTotalCount.textContent = currentPhoto.comments.length;

    allComments = currentPhoto.comments;//заполняем allComments
    socialCommentTotalCount.textContent = allComments.length; // oбщее количество комментариев

    clearInnerHTML(socialComments);
    displayComments();
    checkHideButton();
    commentsLoader.addEventListener('click', onCommentsLoaderClick);//добавляем обработчик на кнопку загрузки

    // const fragmentSocialComments = document.createDocumentFragment();
    // currentPhoto.comments.forEach((comment) => {
    //   const {avatar, name, message} = comment;
    //   const socialCommentTemplate = socialComment.cloneNode(true);

    //   socialCommentTemplate.querySelector('.social__picture').src = avatar;
    //   socialCommentTemplate.querySelector('.social__picture').alt = name;
    //   socialCommentTemplate.querySelector('.social__text').textContent = message;

    //   fragmentSocialComments.appendChild(socialCommentTemplate);
    // });

    // socialComments.appendChild(fragmentSocialComments);

    //-----------------------

    bigPicture.classList.remove('hidden');//+
    // socialCommentCount.classList.add('hidden'); // прячем блоки по заданию 8.14
    // commentsLoader.classList.add('hidden'); // прячем блоки по заданию 8.14
    document.body.classList.add('modal-open');
    bigPictureCancel.addEventListener('click', onBigPictureCancelClick); // повесить обработчик на крестик
    document.addEventListener('keydown', onBigPictureEscKeydown);//3+ // повесить обработчик на эскейп
  }
};

export {openBigPicture};
