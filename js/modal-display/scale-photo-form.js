const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const imgUploadPreview = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
};

//Уменьшение масштаба
const onSmallerButtonClick = () => {
  currentScale -= SCALE_STEP;
  if (currentScale < MIN_SCALE) {
    currentScale = MIN_SCALE;
  }
  updateScale();
};

// Увеличение масштаба
const onBiggerButtonClick = () => {
  currentScale += SCALE_STEP;
  if (currentScale > MAX_SCALE) {
    currentScale = MAX_SCALE;
  }
  updateScale();
};

const resetScale = () => {
  uploadForm.addEventListener('reset', () => {
    currentScale = DEFAULT_SCALE;
    updateScale();
  });
};

const initUpdateScale = () => {
  if (scaleControlSmaller && scaleControlBigger) {
    scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
    scaleControlBigger.removeEventListener('click', onBiggerButtonClick);
    scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
    scaleControlBigger.addEventListener('click', onBiggerButtonClick);
  }
  resetScale();
};

export { initUpdateScale, resetScale };
