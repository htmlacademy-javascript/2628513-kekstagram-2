/* eslint-disable no-console */


//-------------------------------
// //Zad1
//-------------------------------
// //zad1
// const STRING = 'проверяемая строка';
// const maxLenght = 10;
// const checksFunction = (STRING.length <= maxLenght);
// console.log(checksFunction);
//-------------------------------
// //Zad2
//-------------------------------
// const getPalindrome = (STR) => {
//   const strToArr = STR.replaceAll(' ','').toUpperCase();
//   let palindroneStr = '';
//   for(let i = strToArr.length - 1; i >= 0 ;i--) {
//     palindroneStr += strToArr[i];
//   }
//   if(strToArr === palindroneStr){
//     return true;
//   }
//   return false;
// };
//-------------------------------
// const getPalindrome = (STR) => STR.toUpperCase().replaceAll(' ','') === STR.toUpperCase().replaceAll(' ','').split('').reverse().join('');
// //const STR = 'Лёша на полке клопа нашёл ';
// //console.log(STR.toUpperCase().replaceAll(' ',''));
// //console.log(STR.toUpperCase().replaceAll(' ','').split('').reverse().join(''));
// //-------------------------------
// console.log(getPalindrome('топот'));
// console.log(getPalindrome('ДовОд'));
// console.log(getPalindrome('Кекс'));
// console.log(getPalindrome('Лёша на полке клопа нашёл '));
//-------------------------------
// //Zad3
//-------------------------------

const getNumber = (STRING = '') => console.log(Math.abs(parseInt(STRING.replace(/\D+/g,''),10)));
// let result = '';
// const getNumber = (STR) => STR.forEach ((element) => (!Number.isNaN(parseInt(element,10)) === true) ? Math.abs(result += result[element]) : console.log('NaN'));-не получается,после разобрать

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');

// const STR3 = STR.forEach ((element) => console.log(parseInt(element,10)));


// returnPositiveInteger('2023 год');
// returnPositiveInteger('ECMAScript 2022');
// returnPositiveInteger('1 кефир, 0.5 батона');
// returnPositiveInteger('агент 007');
// returnPositiveInteger('а я томат');


//---------------------------------------//
// DZ#2(тесты для себя)
//---------------------------------------//
//Zad1
//---------------------------------------//

// // eslint-disable-next-line no-console, no-unused-expressions
// (Number(STRING.lenght) <= maxLenght) ? console.log(true) : console.log(false);
// // eslint-disable-next-line no-console
//---------------------------------------//
// Алфавит
// const symbols = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', ' ', '.', ',', '—', '!'];

// const encodedSymbols = [18, 38, 46, 62, 66, 50, 33, 41, 66, 49, 48, 38, 58, 62, 68, 66, 48, 37, 42, 47, 66, 50, 33, 41, 66, 49, 48, 51, 49, 42, 67];
// let decodedMessage = '';
// for(let i = 0; i <= encodedSymbols.length - 1 ;i++) {
//   for(let j = 0; j <= symbols.length - 1 ;j++) {
//     if(encodedSymbols[i] === j) {
//       decodedMessage += symbols[j];
//     }
//   }
// }
// // eslint-disable-next-line no-console
// console.log(decodedMessage);
//---------------------------------------//
// encodedSymbols.forEach((i) => {
//   decodedMessage += symbols[i];
// });
// eslint-disable-next-line no-console
// console.log(decodedMessage);
//---------------------------------------//
//Zad2
//---------------------------------------//
// const qualificationDistance = 205;
// const attempts = [120, 150, 160, 201, 203, 180, 202];
// let qualified = false;
// let currentMax;
// let averageBest;

/* Техническое задание
В течение тренировки я делаю несколько прыжков, и собираю длины прыжков в массив attempts.
Программа должна выбрать три лучших прыжка, а затем посчитать среднее значение этих трёх прыжков и записать его в переменную averageBest.
Квалификационное значение хранится в переменной qualificationDistance.
Если среднее от лучших трёх прыжков больше квалификационного значения, то я прошёл квалификацию и переменная qualified должна содержать true. Если квалификация не пройдена, то в qualified должно быть false.
*/
// for(let i = 0; i <= attempts.length - 2 ;i++){
//   currentMax = attempts[i];
//   for (let j = i + 1; j <= attempts.length - 1;j++){
//     if(attempts[j] >= currentMax){
//       currentMax = attempts[j];
//       const swap = attempts[i];
//       attempts[i] = currentMax;
//       attempts[j] = swap;
//     }
//     averageBest = (attempts[0] + attempts[1] + attempts[2]) / 3;
//   }
// }
// console.log(averageBest);
// if(averageBest > qualificationDistance){
//   console.log(qualified = true);
// } else {
//   console.log(qualified);
// }


// const materialPrice = {
//   'wood': 1000,
//   'stone': 1500,
//   'brick': 2000
// };

// const house = {
//   rooms: 10,
//   floors: 5,
//   material: 'wood',
//   coefficient: 10.5 ,

//   calculateSquare: function() {
//     return this.rooms * this.coefficient * this.floors;
//   },

//   calculatePrice: function() {
//     for(const key in materialPrice) {
//       if(key === 'wood'){
//         return this.calculateSquare() * materialPrice[key];
//       }
//       if(key === 'stone'){
//         return this.calculateSquare() * materialPrice[key];
//       }
//       if(key === 'brick'){
//         return this.calculateSquare() * materialPrice[key];
//       }
//     }
//   }
// };

// console.log(house.calculatePrice('stone'));
// console.log(house.calculateSquare());

