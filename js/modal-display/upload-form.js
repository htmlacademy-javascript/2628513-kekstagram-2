import { isEscapeKey } from '../util.js';
import { validateFormat, validateCount, validateUniqueness } from './verifying-hashtags.js';
import { validateCommentLength } from './verifying-description.js';
import { uploadForm, image} from './scale-photo-form.js';
import { showErrorMessage, body } from '../show-error-message.js';


const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif'];

const uploadFile = uploadForm.querySelector('#upload-file');

const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');

const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(textHashtags, validateFormat, 'Неверный формат хэштега');
pristine.addValidator(textHashtags, validateUniqueness, 'Хэштеги не должны повторяться');
pristine.addValidator(textHashtags, validateCount, 'Нельзя указать больше пяти хэштегов');
pristine.addValidator(textDescription, validateCommentLength, 'Комментарий слишком длинный');

function closeElement () {
  uploadForm.reset();

  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', onElementCancelClick);
  document.removeEventListener('keydown', onElementEscKeydown);

  image.src = 'img/upload-default-image.jpg';

  pristine.reset();
}

function onElementCancelClick(evt) {
  evt.preventDefault();
  closeElement();
}

const initUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', onElementCancelClick);
  document.addEventListener('keydown', onElementEscKeydown);
};

function onElementEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === textHashtags || document.activeElement === textDescription) {
      return;
    }
    closeElement();
  }
}

function onfileInputChange() {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    const url = URL.createObjectURL(file);
    image.src = url;
    const uploadPreviewEffects = document.querySelectorAll('.effects__preview');
    uploadPreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
    initUploadModal();
  } else {
    showErrorMessage('Неверный тип файла. Выберите изображение в формате JPG, JPEG, PNG или GIF.');
    uploadFile.value = '';
  }
}

const initUploadModalChange = () => {
  uploadFile.addEventListener('change', onfileInputChange);
};

export { initUploadModalChange, pristine, closeElement };
