import { isEscapeKey } from '../util.js';
import { validateFormat, validateCount, validateUniqueness } from './verifying-hashtags.js';
import { validateCommentLength } from './verifying-description.js';
import { showErrorMessage, showSuccessMessage } from '../show-error-message.js';
import { initUpdateScale, resetScale } from './scale-photo-form.js';
import { updateEffect, updateEffectPreviews, resetEffects } from './effect-photo-form.js';
import {sendData} from '../api.js';

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif'];

const body = document.querySelector('body');

const uploadForm = document.querySelector('.img-upload__form');//'#upload-select-image'
const uploadInput = document.querySelector('.img-upload__input');//#upload-file
const uploadCancel = document.querySelector('.img-upload__cancel');//#upload-cancel

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');

const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const uploadSubmit = document.querySelector('.img-upload__submit');

const messageSuccess = document.querySelector('.success');
const messageError = document.querySelector('.error');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(textHashtags, validateFormat, 'Неверный формат хэштега');
pristine.addValidator(textHashtags, validateUniqueness, 'Хэштеги не должны повторяться');
pristine.addValidator(textHashtags, validateCount, 'Нельзя указать больше пяти хэштегов');
pristine.addValidator(textDescription, validateCommentLength, 'Комментарий слишком длинный');

//Обработчик нажатия клавиши Escape

function onElementEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    // Если сообщение  об ошибке или успехе открыто, не закрываем форму (сообщение закроется само)
    if (messageSuccess || messageError) {
      return;
    }

    //  Если фокус в текстовом поле, не закрываем форму
    if (document.activeElement === textHashtags || document.activeElement === textDescription) {
      return;
    }
    closeUploadModal();
  }
}

const openUploadModal = () => {

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onElementEscKeydown);

  initUpdateScale();
  updateEffect();
};

function closeUploadModal () {

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onElementEscKeydown);

  uploadForm.reset();
  pristine.reset();

  resetScale();
  resetEffects();


  uploadInput.value = '';

  // Сбрасываем превью на дефолтное изображение
  imgUploadPreview.src = 'img/upload-default-image.jpg';
  updateEffectPreviews('img/upload-default-image.jpg');
}

function onCancelButtonClick(evt) {
  evt.preventDefault();
  closeUploadModal();
}

//Обработчик изменения поля выбора файла

function onFileInputChange() {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (!file) {
    return;

  }
  // Проверка типа файла
  if (matches) {

    // Создание URL для превью изображения
    const imageUrl = URL.createObjectURL(file);
    imgUploadPreview.src = imageUrl;

    // Обновляем превью эффектов с загруженной фотографией
    updateEffectPreviews(imageUrl);

    openUploadModal();
  } else {
    showErrorMessage('Неверный тип файла. Выберите изображение в формате JPG, JPEG, PNG или GIF.');
    uploadInput.value = '';
  }
}


// Блокирует кнопку отправки

const blockSubmitButton = () => {
  uploadSubmit.disabled = true;
  uploadSubmit.textContent = 'Отправляю...';
};

// Разблокирует кнопку отправки
const unblockSubmitButton = () => {
  uploadSubmit.disabled = false;
  uploadSubmit.textContent = 'Опубликовать';
};

// Обработчик отправки формы
const onFormSubmit = (evt) => {
  evt.preventDefault();

  // Валидация через Pristine
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  // Блокируем кнопку отправки
  blockSubmitButton();

  // Создаем FormData из формы
  const formData = new FormData(uploadForm);

  // Отправляем данные на сервер
  sendData(formData)
    .then(() => {
      // Успешная отправка
      closeUploadModal();
      showSuccessMessage();
    })
    .catch(() => {
      // Ошибка отправки
      showErrorMessage();
    })
    .finally(() => {
      // Разблокируем кнопку в любом случае
      unblockSubmitButton();
    });
};

// Инициализация модуля формы

const initForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  uploadCancel.addEventListener('click', onCancelButtonClick);
  uploadForm.addEventListener('submit', onFormSubmit);
};

export { initForm };
