import {renderThumbnails} from './thumbnails/thumbnails.js';
import {openBigPictureClick} from './thumbnails/big-photo-thumbnails.js';
import {configFilter} from './thumbnails/filter-thumbnails.js';
import {showDataErrorMessage} from './show-error-message.js';
import {getData} from './api.js';
import {initForm} from './modal-display/form.js';


const bootstrap = () => {
  // Инициализируем форму загрузки
  initForm();

  // Загружаем данные с сервера
  getData()
    .then((photos) => {
      renderThumbnails(photos);
      openBigPictureClick(photos);
      configFilter(photos);
    })
    .catch(() => {
      showDataErrorMessage();
    });
};

bootstrap();

