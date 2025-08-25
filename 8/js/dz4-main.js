/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const DESCRIPTTIONS = [
  'Леонардо да Винчи, «Мона Лиза».',
  'Анри Матисс, «Танец».',
  'Микеланджело Буонарроти, «Сотворение Адама».',
  'Гюстав Курбе, «Отчаяние. Автопортрет».',
  'Карл Брюллов, «Всадница».',
  'Пьер Огюст Ренуар, «Завтрак гребцов».',
  'Рафаэль Санти, «Сикстинская Мадонна».',
  'Иероним Босх, «Сад земных наслаждений».',
  'Диего Веласкес, «Менины».',
  'Эжен Делакруа, «Свобода, ведущая народ».',
  'Михаил Врубель, «Демон сидящий».',
  'Грант Вуд, «Американская готика».',
  'Рене Магритт, «Сын человеческий».',
  'Сальвадор Дали, «Постоянство памяти».',
  'Иван Айвазовский, «Девятый вал».',
  'Питер Брейгель, «Вавилонская башня».',
  'Леонардо да Винчи, «Тайная вечеря».',
  'Эдуард Мане, «Бар в „Фоли-Бержер“».',
  'Эдгар Дега, «Голубые танцовщицы».',
  'Рембрандт, «Ночной дозор».',
  'Эдвард Мунк, «Крик».',
  'Жак-Луи Давид, «Смерть Марата».',
  'Винсент Ван Гог, «Звёздная ночь».',
  'Сандро Боттичелли, «Рождение Венеры».',
  'Ян Вермеер, «Девушка с жемчужной серёжкой».',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Даниил',
  'Тимофей',
  'Владислав',
  'Игорь',
  'Владимир',
  'Руслан',
];

const PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getGeneratorRandomInteger = (min, max) => {
  const boxNumber = new Set();
  const currentNumber = getRandomInteger(min, max);
  boxNumber.add(currentNumber); // есть ли такое число , если да - можно добавить только один раз
  return currentNumber;
};

const getCounter = () => {
  let firstCounter = 0;
  return () => (firstCounter += 1);
};

const getCounterPhotoId = getCounter();
const getCounterPhotoUrl = getCounter();
const getCounterCommentId = getCounter();

// const getComments = () => {
//   const arreyCreateComments = [];
//   for(let i = 0; i <= getRandomСurrentNumber(0, 30);i++){
//     arreyCreateComments.push({
//       id: getCounterCommentId(),
//       avatar: `img/avatar-${getRandomСurrentNumber(1, 6)}.svg`,
//       message: `${getRandomArrayElement(MESSAGES)}`,
//       name: `${getRandomArrayElement(NAMES)}`,
//     });
//   }
//   return arreyCreateComments;
// };

const getComments = () => ({
  id: getCounterCommentId(),// не должны повторяться
  avatar: `img/avatar-${getGeneratorRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,//все случайные,могут повторяться
  name: `${getRandomArrayElement(NAMES)}`,//все случайные,могут повторяться
});

const getPhotos = () => ({
  id: getCounterPhotoId(),//не должны повторяться
  url: `photos/${getCounterPhotoUrl()}.jpg`, // не должны повторяться
  description: `${getRandomArrayElement(DESCRIPTTIONS)}`,//все случайные,могут повторяться
  likes: getRandomInteger(15, 200), //все случайные,могут повторяться
  comments: Array.from({length: getGeneratorRandomInteger(0, 30)}, getComments), //генерируются случайным образом.
});

const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, getPhotos);

// console.log(getPhotos());
console.log(getAllPhotos());
