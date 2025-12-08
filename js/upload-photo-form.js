import {isEscapeKey} from './util.js';
import {validateFormat,validateCount,validateUniqueness} from './verifying-hashtags.js';
import {validateCommentLength} from './verifying-description.js';


const uploadForm = document.querySelector('.img-upload__form');//35 Форма поля для загрузки нового изображения на сайт
const pageBody = document.querySelector('body');

const uploadFile = uploadForm.querySelector('#upload-file');//39 Изначальное состояние поля для загрузки изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');//44 Форма редактирования изображения
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');//67 Кнопка для закрытия формы редактирования изображения

const textHashtags = uploadForm.querySelector('.text__hashtags');//121Добавление хэштегов к изображению
const textDescription = uploadForm.querySelector('.text__description');//124Добавление комментария к изображению

const closeElement = () => {
  uploadFile.value = '';//обнуляем значение инпута(сбрасывать значение поля)
  imgUploadOverlay.classList.add('hidden');//+
  document.body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', onElementCancelClick); // снять обработчик с кнопки
  document.removeEventListener('keydown', onElementEscKeydown);// снять обработчик с эскейпа
};

const initUploadModal = () => {

  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  uploadCancel.addEventListener('click', onElementCancelClick); // повесить обработчик на кнопку
  document.addEventListener('keydown', onElementEscKeydown); // повесить обработчик на эскейп
};

function onElementCancelClick (event) {
  event.preventDefault();
  closeElement();
}

function onElementEscKeydown (event) {//обработчик события нажатие в модал окно клавиши esc
  if(isEscapeKey(event)) {
    event.preventDefault();

    if (textHashtags.contains(document.activeElement) || textDescription.contains(document.activeElement)) { // Если фокус в поле хэштегов, то мы НЕ закрываем форму.
      event.stopPropagation(); // Останавливаем дальнейшее "всплытие" события
    } else {
      // Если фокус НЕ в поле хэштегов, тогда закрываем форму.
      closeElement();
    }
  }
}

const initUploadModalChange = () => {
  uploadFile.addEventListener('change', () => {
    initUploadModal();
  });
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent:'img-upload__field-wrapper',
});


// Добавляем валидатор формата
pristine.addValidator(
  textHashtags,
  validateFormat,
  'Хэш-тег должен начинаться с # и содержать только буквы и цифры (максимум 20 символов).'
);

// Добавляем валидатор уникальности
pristine.addValidator(
  textHashtags,
  validateUniqueness,
  'Хэштеги не должны повторяться (даже в разном регистре).'
);

// Добавляем валидатор количества
pristine.addValidator(
  textHashtags,
  validateCount,
  'Нельзя указать больше пяти хэштегов.'
);

// Добавляем валидатор комментария
pristine.addValidator(
  textDescription,
  validateCommentLength,
  'Длина комментария не может превышать 140 символов.'
);

uploadForm.addEventListener('submit', (event) => {//обработчик отправки формы

  event.preventDefault();
  const isValid = pristine.validate();//проверяет ВСЕ поля, для которых добавлены валидаторы

  if (isValid) {
    uploadForm.submit();
  }
});

export {initUploadModalChange};
