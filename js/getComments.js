import {getValue} from './data.js';
import {getRandomArrayElement, getGeneratorRandomInteger} from './getRandomArrayElement.js';
import {getCounter} from './getCounter.js';

const getCounterCommentId = getCounter();
const{ MESSAGES, NAMES} = getValue();

const getComments = () => ({
  id: getCounterCommentId(),// не должны повторяться
  avatar: `img/avatar-${getGeneratorRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,//все случайные,могут повторяться
  name: `${getRandomArrayElement(NAMES)}`,//все случайные,могут повторяться
});

export {getComments};
