import {getPhotos} from './get-photos.js';
import {getFragment} from './thumbnails.js';
import {openBigPictureClick} from './big-foto.js';
import {initUploadModalChange} from './upload-photo-form.js';
import {updateScale} from './scale-photo-form.js';

import {updateEffect} from './effect-photo-form.js';


const PHOTO_COUNT = 25;
const createPhoto = getPhotos;//создает ОДНУ фотографию
const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);

const photosArray = getAllPhotos();

getFragment(photosArray);//Создаем фрагмент с миниатюрами и добавляем на страницу
openBigPictureClick(photosArray);//Функция открытия большого фото
initUploadModalChange();//Функция открытия модального окна
updateScale();//Устанавливаем начальное состояние при загрузке страницы
// noUiSliderCreate();

updateEffect();// Устанавливаем начальное состояние при загрузке

