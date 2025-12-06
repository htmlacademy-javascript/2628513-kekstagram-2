/* eslint-disable no-console */
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

const template = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

// Для одной фотографии
// const photo = getAllPhotos()[24];
// const image = template.querySelector('.picture__img');
// image.src = photo.url;
// image.alt = photo.description;
// template.querySelector('.picture__comments').textContent = photo.comments.length;
// template.querySelector('.picture__likes').textContent = photo.likes;
// const getAllThumbnails = container.appendChild(template);

const createThumbnail = (photo) => {
  const {id,url,description,likes,comments} = photo;//деструкторизация
  const thumbnailElement = template.cloneNode(true);

  thumbnailElement.dataset.pictureId = id;//важно связь между фото pichtureId
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;

  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailElement;
};

const getFragment = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photoElement) => {
    const thumbnailElement = createThumbnail(photoElement);
    fragment.appendChild(thumbnailElement);
  });

  return containerPictures.appendChild(fragment);
};

export {getFragment,containerPictures};

