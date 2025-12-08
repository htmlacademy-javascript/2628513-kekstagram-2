import {getValue} from './data.js';
import {getCounter, getRandomInteger, getRandomArrayElement, getGeneratorRandomInteger} from './get-random-array-element.js';
import {getComments} from './get-comments.js';

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
