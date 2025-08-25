/* eslint-disable no-console */
/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах */

// const getTimeMinutes = (time) => {
//   const [hours, minutes] = time.toString().split(':').map(Number);
//   return hours * 60 + minutes;
// };

// const getWorkTimeDey = (startTimeDey, endTimeDey, startMeeting, lengthMeeting) => {

//   if((getTimeMinutes(startMeeting) >= getTimeMinutes(startTimeDey)) && (getTimeMinutes(startMeeting) <= getTimeMinutes(endTimeDey))){
//     if(Math.abs(getTimeMinutes(startMeeting) - getTimeMinutes(endTimeDey)) >= lengthMeeting){
//       return console.log('true');
//     } else {
//       return console.log('false');
//     }
//   } else {
//     return console.log('false');
//   }
// };

// getWorkTimeDey('08:00', '17:30', '14:00', 90); // true
// getWorkTimeDey('8:0', '10:0', '8:0', 120); // true
// getWorkTimeDey('08:00', '14:30', '14:00', 90); // false
// getWorkTimeDey('14:00', '17:30', '08:0', 90); // false
// getWorkTimeDey('8:00', '17:30', '08:00', 900); // false
