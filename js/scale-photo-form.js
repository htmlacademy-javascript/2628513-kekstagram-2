const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const updateScale = () => { //функцию для обновления масштаба (поля ввода, стиля изображения)
  scaleControlValue.value = `${currentScale}%`;

  const image = imgUploadPreview.querySelector('img');

  if (image) {
    image.style.transform = `scale(${currentScale / 100})`;
  }
};

scaleControlSmaller.addEventListener('click', () => { // Обработчик для кнопки "Уменьшить"
  currentScale -= SCALE_STEP;
  if (currentScale < MIN_SCALE) {
    currentScale = MIN_SCALE;
  }
  updateScale();
});

scaleControlBigger.addEventListener('click', () => {// Обработчик для кнопки "Увеличить"

  currentScale += SCALE_STEP;
  if (currentScale > MAX_SCALE) {
    currentScale = MAX_SCALE;
  }
  updateScale();
});

export {updateScale,imgUploadPreview};
