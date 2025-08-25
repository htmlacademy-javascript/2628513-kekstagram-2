/* eslint-disable no-console */
import {getPhotos} from './getPhotos.js';
/*
  <!-- Шаблон изображения случайного пользователя -->
  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>
*/
// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество комментариев comments выведите в блок .picture__comments.
// Количество лайков likes выведите в блок .picture__likes.

const PHOTO_COUNT = 25;
const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, getPhotos);

// console.log(getPhotos());
// console.log(getAllPhotos());

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

// Для одной фотографии
// const photo = getAllPhotos()[24];
// const image = template.querySelector('.picture__img');
// image.src = photo.url;
// image.alt = photo.description;
// template.querySelector('.picture__comments').textcontent = photo.comments.length;
// template.querySelector('.picture__likes').textcontent = photo.likes;
// const getAllThumbnails = container.appendChild(template);

const createThumbnail = (photo) => {
  const thumbnailElement = template.cloneNode(true);
  const image = thumbnailElement.querySelector('.picture__img');

  image.href = photo.url;
  image.dataset.id = photo.id;

  image.src = photo.url;
  image.alt = photo.description;

  thumbnailElement.querySelector('.picture__comments').textcontent = photo.comments.length;
  thumbnailElement.querySelector('.picture__likes').textcontent = photo.likes;

  return thumbnailElement;
};

const fragment = document.createDocumentFragment();

getAllPhotos().forEach((photo) => {
  const thumbnailElement = createThumbnail(photo);
  fragment.appendChild(thumbnailElement);
});

const getThumbnails = container.appendChild(fragment);

export {getThumbnails};

