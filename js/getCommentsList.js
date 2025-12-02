/* eslint-disable no-use-before-define */


const commentsLoader = bigPicture.querySelector('.comments-loader');//кнопка загрузки комментариев
const socialCommentCount = bigPicture.querySelector('.social__comment-count');//кол-во загружаемых комментариев


const commentsPage = 5; // Определенное количество комментариев для загрузки за раз
const currentPage = 0; // Текущая пачка комментариев

// Вычисляем, с какого и по какой комментарий показывать
const startIndex = currentPage + commentsPage;
const endIndex = startIndex + commentsPage;

// Получаем "слайс" (часть) массива для текущей страницы
socialCommentShownCount = socialCommentTotalCount.slice(startIndex, endIndex);
socialCommentCount = socialCommentShownCount.length + commentsPage;

const fragmentSocialComments = document.createDocumentFragment();
socialCommentShownCount.comments.forEach((comment) => {
  const {avatar, name, message} = comment;
  const socialCommentTemplate = socialComment.cloneNode(true);

  socialCommentTemplate.querySelector('.social__picture').src = avatar;
  socialCommentTemplate.querySelector('.social__picture').alt = name;
  socialCommentTemplate.querySelector('.social__text').textContent = message;

  fragmentSocialComments.appendChild(socialCommentTemplate);
});

socialCommentTotalCount.appendChild(fragmentSocialComments);


