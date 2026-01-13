import { EFFECTS } from '../data.js';


const EFFECT_LEVEL_MAX = 100;

const uploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const effectsRadioButtons = uploadForm.querySelectorAll('.effects__radio');

const effectLevelSliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

let currentEffect = 'none';
let currentEffectClass = 'effects__preview--none';

const updateEffectPreviews = (imageUrl) => {
  const uploadPreviewEffects = document.querySelectorAll('.effects__preview');
  uploadPreviewEffects.forEach((item) => {
    item.style.backgroundImage = `url(${imageUrl})`;
  });
};


if (!effectLevelSlider.noUiSlider) {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });
}

const updateEffect = () => {

  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';

    if (imgUploadPreview.classList.contains(currentEffectClass)) {
      imgUploadPreview.classList.remove(currentEffectClass);
    }
    if (!imgUploadPreview.classList.contains('effects__preview--none')) {
      imgUploadPreview.classList.add('effects__preview--none');
    }
    currentEffectClass = 'effects__preview--none';

    effectLevelSliderContainer.classList.add('hidden');

    effectLevelValue.value = '';
    return;
  }

  const effectConfig = EFFECTS[currentEffect];
  const newEffectClass = `effects__preview--${currentEffect}`;

  imgUploadPreview.classList.remove(currentEffectClass);
  imgUploadPreview.classList.add(newEffectClass);
  currentEffectClass = newEffectClass;

  effectLevelSliderContainer.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min: effectConfig.min, max: effectConfig.max },
    step: effectConfig.step,
    start: effectConfig.max,
  });

  effectLevelSlider.noUiSlider.set(effectConfig.max);

  applyFilter(effectConfig.max);
};

function applyFilter(value) {
  if (currentEffect === 'none') {
    return;
  }
  const { style, unit } = EFFECTS[currentEffect];
  const filterString = `${style}(${value}${unit})`;
  imgUploadPreview.style.filter = filterString;
  effectLevelValue.value = value;
}

effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  applyFilter(values[handle]);
});

effectsRadioButtons.forEach((button) => {
  button.addEventListener('change', (event) => {
    currentEffect = event.target.value;
    updateEffect();
  });
});

const resetEffects = () => {
  uploadForm.addEventListener('reset', () => {
    currentEffect = 'none';
    updateEffect();

    if (effectLevelSlider.noUiSlider) {
      effectLevelSlider.noUiSlider.set(EFFECT_LEVEL_MAX);
    }
  });
};


export { updateEffect, resetEffects, updateEffectPreviews };
