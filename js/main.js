/* eslint-disable no-console */
import {getPhotos} from './getPhotos.js';

const PHOTO_COUNT = 25;
const getAllPhotos = () => Array.from({length: PHOTO_COUNT}, getPhotos);

// console.log(getPhotos());
console.log(getAllPhotos());
