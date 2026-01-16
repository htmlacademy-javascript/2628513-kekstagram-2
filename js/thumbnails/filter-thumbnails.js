import { renderThumbnails } from './thumbnails.js';
import { debounce } from '../util';

const DEBOUNCE_DELAY = 500;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FILTER = {
  default: 'filter-default',
  random:'filter-random',
  discussed:'filter-discussed',
};
const filterElement = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let pictures = [];
let currentFilter = FILTER.default;

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);

  }

  // Перерисовываем миниатюры с отфильтрованными данными
  renderThumbnails(filteredPictures);
}

const debounceRender = debounce(applyFilter, DEBOUNCE_DELAY);

function onFilterButtonClick(evt) {
  const targetButton = evt.target;

  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  // Проверяем, что клик был по кнопке фильтра
  if (!targetButton.matches('button')) {
    return;
  }
  // Если кнопка уже активна, ничего не делаем
  if (activeButton === targetButton) {
    return;
  }

  // Обновляем активную кнопку
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  // Применяем фильтр с debounce
  debounceRender();
}

function configFilter(picturesData) {
  pictures = [...picturesData];
  filterElement.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterButtonClick);
}
export { configFilter };
