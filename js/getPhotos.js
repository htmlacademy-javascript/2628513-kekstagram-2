import {getValue} from './data.js';
import {getRandomInteger, getRandomArrayElement, getGeneratorRandomInteger} from './getRandomArrayElement.js';
import {getCounter} from './getCounter.js';
import {getComments} from './getComments.js';

const{ DESCRIPTIONS} = getValue();//деструкторизация

const getCounterPhotoId = getCounter();
const getCounterPhotoUrl = getCounter();

const getPhotos = () => ({
  id: getCounterPhotoId(),
  url: `photos/${getCounterPhotoUrl()}.jpg`, // не должны повторяться
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,//все случайные,могут повторяться
  likes: getRandomInteger(15, 200), //все случайные,могут повторяться
  comments: Array.from({length: getGeneratorRandomInteger(0, 30)}, getComments), //генерируются случайным образом.
});

export {getPhotos};
