const template = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const {id,url,description,likes,comments} = photo;
  const thumbnailElement = template.cloneNode(true);

  thumbnailElement.dataset.pictureId = id;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;

  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  const commentsCount = Array.isArray(photo.comments) ? comments.length : 0;
  thumbnailElement.querySelector('.picture__comments').textContent = commentsCount;

  return thumbnailElement;
};

const clearThumbnails = () => {
  containerPictures.querySelectorAll('.picture').forEach((item) => item.remove());
};

const renderThumbnails = (photos) => {
  clearThumbnails();
  const fragment = document.createDocumentFragment();

  photos.forEach((photoElement) => {
    const thumbnailElement = createThumbnail(photoElement);
    fragment.appendChild(thumbnailElement);
  });

  return containerPictures.appendChild(fragment);
};

export {renderThumbnails,containerPictures};

