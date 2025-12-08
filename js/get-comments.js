import {getValue} from './data.js';
import {getCounter, getRandomArrayElement, getGeneratorRandomInteger} from './get-random-array-element.js';

const getCounterCommentId = getCounter();
const{ MESSAGES, NAMES} = getValue();

const getComments = () => ({
  id: getCounterCommentId(),// не должны повторяться
  avatar: `img/avatar-${getGeneratorRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,//все случайные,могут повторяться
  name: `${getRandomArrayElement(NAMES)}`,//все случайные,могут повторяться
});

export {getComments};
