const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const imgUploadPreview = document.querySelector('.img-upload__preview');
const image = imgUploadPreview.querySelector('img');

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  // Важно: применяем transform к image, а не к контейнеру
  image.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  currentScale -= SCALE_STEP;
  if (currentScale < MIN_SCALE) {
    currentScale = MIN_SCALE;
  }
  updateScale();
});

scaleControlBigger.addEventListener('click', () => {
  currentScale += SCALE_STEP;
  if (currentScale > MAX_SCALE) {
    currentScale = MAX_SCALE;
  }
  updateScale();
});

uploadForm.addEventListener('reset', () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
});

export { updateScale, uploadForm, imgUploadPreview, image };
