import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

const TITLES = [
  'Шикарная квартира',
  'Уютный номер в центре Москвы',
  'Прекрасный вид на Ниву',
  'Современная квартира с парковкой',
  'Новостройка на набережной',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
];

const DESCRIPTIONS = [
  'Очень светлая и уютное помещение',
  'Просторный двор и красивый сад',
  'Поблизости много парковочных мест и магазинов',
  'Детская плошадка прямо напротив дома',
  'Через дорогу находится школа и поликлиника',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg,',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MINIMUM_PRICE = 1000;
const MAXIMUM_PRICE = 100000;
const MINIMUM_ROOM_NUMBER = 1;
const MAXIMUM_ROOM_NUMBER = 10;
const MINIMUM_GUESTS_NUMBER = 1;
const MAXIMUM_GUESTS_NUMBER = 10;
const SIMILAR_POSTS_COUNT = 10;
const MINIMUM_LAT = 35.65000;
const MAXIMUM_LAT = 35.70000;
const MINIMUM_LNG = 35.65000;
const MAXIMUM_LNG = 35.70000;
const LOCATION_NUMBER_DIGITS = 5;

const getRandomPictureLink = () => {
  const result = getRandomPositiveInteger(1, 10);
  return result < 10 ? `0${result}` : result;
};


const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const createPost = () => {
  const getLocationLat = getRandomPositiveFloat(MINIMUM_LAT, MAXIMUM_LAT, LOCATION_NUMBER_DIGITS);
  const getLocationLng = getRandomPositiveFloat(MINIMUM_LNG, MAXIMUM_LNG, LOCATION_NUMBER_DIGITS);
  return {
    author: {
      avatar: `img/avatars/user${getRandomPictureLink()}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: {
        lat: getLocationLat,
        lng: getLocationLng,
      },
      price: getRandomPositiveInteger(MINIMUM_PRICE, MAXIMUM_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(MINIMUM_ROOM_NUMBER, MAXIMUM_ROOM_NUMBER),
      guests: getRandomPositiveInteger(MINIMUM_GUESTS_NUMBER, MAXIMUM_GUESTS_NUMBER),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: getLocationLat,
      lng: getLocationLng,
    },
  };
};

const createPosts =() => Array.from({length: SIMILAR_POSTS_COUNT}, createPost);
export {createPosts};
