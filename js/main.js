/* eslint-disable no-console */

import {getPhotos} from './getPhotos.js';
import {getFragment,containerPictures} from './thumbnails.js';
import {openBigPicture} from './getBigFoto.js';

const PHOTO_COUNT = 25;
const createPhoto = getPhotos;//создает ОДНУ фотографию
const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

const photosArray = getAllPhotos();
// getFragment(photosArray);
getFragment(photosArray);//Создаем фрагмент с миниатюрами и добавляем на страницу

containerPictures.addEventListener('click', (event) => {
  const currentPicture = event.target.closest('.picture');

  if(currentPicture) {
    event.preventDefault();
    openBigPicture(photosArray,currentPicture.dataset.pictureId);
  }
});

// containerPictures.addEventListener('click', (event) => {
//   console.log('Сработал клик по контейнеру .pictures!'); // Проверяем, что обработчик вообще вызывается

//   const currentPicture = event.target.closest('.picture');
//   console.log('Найденный элемент .picture:', currentPicture); // Проверяем, что .picture находится

//   if (currentPicture) {
//     const pictureId = currentPicture.dataset.pictureId;
//     console.log('ID картинки из data-атрибута:', pictureId); // Проверяем, что ID есть и он не undefined

//     if (pictureId) {
//       console.log('Вызываем openBigPicture...');
//       openBigPicture(photosArray, pictureId);
//     } else {
//       console.error('У элемента .picture отсутствует атрибут data-picture-id!');
//     }
//   }
// });

// openBigPicture(photosArray,24);
// eslint-disable-next-line no-console
// console.log('0000000000000');
