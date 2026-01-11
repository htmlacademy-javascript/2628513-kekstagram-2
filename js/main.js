import {renderThumbnails} from './thumbnails/thumbnails.js';
import {openBigPictureClick} from './thumbnails/big-photo-thumbnails.js';
import {configFilter} from './thumbnails/filter-thumbnails.js';
import {showErrorMessage} from './show-error-message.js';

import {initUploadModalChange} from './modal-display/upload-form.js';
import {updateScale} from './modal-display/scale-photo-form.js';
import {updateEffect} from './modal-display/effect-photo-form.js';
import {initForm} from './modal-display/submit-notifications-form.js';

import {getData} from './api.js';


let photos = [];

const setPhotos = (data) => {
  photos = Array.isArray(data) ? data : [];
};

const bootstrap = async() => {
  try {
    photos = await getData();
    setPhotos(photos);
    renderThumbnails(photos);
    openBigPictureClick(photos);
    configFilter(photos);

    initUploadModalChange();
    updateScale();
    updateEffect();
    initForm();
  } catch (error) {
    showErrorMessage(error.message);
  }
};

bootstrap();

