/* eslint-disable no-console */

import {getPhotos} from './getPhotos.js';
import {getFragment} from './thumbnails.js';
import {openBigPictureClick} from './getBigFoto.js';
import {initUploadModalChange} from './uploadPhotoForm.js';
import {updateScale} from './scalePhotoForm.js';


const PHOTO_COUNT = 25;
const createPhoto = getPhotos;//создает ОДНУ фотографию
const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

const photosArray = getAllPhotos();

getFragment(photosArray);//Создаем фрагмент с миниатюрами и добавляем на страницу

openBigPictureClick(photosArray);//Функция открытия большого фото
initUploadModalChange();//Функция открытия модального окна
updateScale();//Устанавливаем начальное состояние при загрузке страницы

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
