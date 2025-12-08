import {imgUploadPreview} from './scale-photo-form.js';//61 css стили картинки заменяются внутри этого блока -предварительный просмотр

const EFFECTS = {
  none: {
    style: '', // Для "Оригинала" стиль отсутствует
    min: 0,
    max: 100, // Максимальное значение для сброса
    step: 1,
    unit: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};


const effectsRadioButtons = document.querySelectorAll('.effects__radio');//78 выбор кнопки с эффектом
const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

// effectLevelValue.value = 80; //значение поля по умолчанию

let currentEffect = 'none';

noUiSlider.create(effectLevelSlider, {//Создание слайдера
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1), //отформатировать значение в слайдере set
    from: (value) => parseFloat(value),//значение,кторое слайдер возвращает get(строки превращаем в число)
  },
});

const updateEffect = () => {//Функция для обновления эффекта на изображении
  // Если эффект "Оригинал"
  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';
    effectLevelSliderContainer.style.display = 'none';// Скрываем слайдер и его контейнер
    effectLevelValue.value = '';// Очищаем скрытое поле
    return;
  }

  const effectConfig = EFFECTS[currentEffect];// Для всех остальных эффектов:

  effectLevelSliderContainer.style.display = 'block';// Показываем контейнер со слайдером

  effectLevelSlider.noUiSlider.updateOptions({// Обновляем настройки слайдера под текущий эффект
    range: {
      min: effectConfig.min,
      max: effectConfig.max,
    },
    step: effectConfig.step,
    start: effectConfig.max,// Сбрасываем ползунок на максимальное значение (100% насыщенности)
  });

  applyFilter(effectConfig.max);// Применяем начальный эффект сразу после смены
};

function applyFilter (value) {//Функция для применения CSS-фильтра
  if (currentEffect === 'none') {
    return;
  }
  const { style, unit } = EFFECTS[currentEffect];
  const filterString = `${style}(${value}${unit})`; // Формируем строку для CSS-свойства filter
  imgUploadPreview.style.filter = filterString;// Применяем стиль к изображению
  effectLevelValue.value = value;// Записываем значение в скрытое поле
}

effectLevelSlider.noUiSlider.on('update', (values, handle) => {// Слушаем изменение на слайдере

  applyFilter(values[handle]); // При каждом движении ползунка применяем фильтр с новым значением
});

effectsRadioButtons.forEach((button) => {// Слушаем клики по радио-кнопкам эффектов
  button.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;// Обновляем текущий эффект
    updateEffect();// Вызываем функцию для обновления всего интерфейса
  });
});

// effectLevelSlider.setAttribute('disabled', true);//заблокировать слайдер
// effectLevelSlider.removeAttribute('disabled');//разблокировать слайдер
// effectLevelSlider.noUiSlider.destroy();

export {updateEffect};
