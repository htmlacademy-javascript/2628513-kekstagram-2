import {DESCRIPTTIONS} from './data.js';
import {getRandomInteger, getRandomArrayElement, getGeneratorRandomInteger} from './getRandomArrayElement.js';
import {getCounter} from './getCounter.js';
import {getComments} from './getComments.js';

const getCounterPhotoId = getCounter();
const getCounterPhotoUrl = getCounter();

const getPhotos = () => ({
  id: getCounterPhotoId(),//не должны повторяться
  url: `photos/${getCounterPhotoUrl()}.jpg`, // не должны повторяться
  description: `${getRandomArrayElement(DESCRIPTTIONS)}`,//все случайные,могут повторяться
  likes: getRandomInteger(15, 200), //все случайные,могут повторяться
  comments: Array.from({length: getGeneratorRandomInteger(0, 30)}, getComments), //генерируются случайным образом.
});

export {getPhotos};
