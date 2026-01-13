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

const debounceRender = debounce(renderThumbnails, DEBOUNCE_DELAY);

function onFilterButtonClick(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');
  applyFilter();
}

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
  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  pictures = [...picturesData];//копируем исходные данные
  filterElement.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterButtonClick);
}
export { configFilter };
