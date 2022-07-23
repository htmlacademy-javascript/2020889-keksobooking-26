import {TYPES} from './data.js';

const postTemplate = document.querySelector('#card').content.querySelector('.popup');

const getPhotos = (elements, postElement) => {
  const photosContainer = postElement.querySelector('.popup__photos');
  const photo = postElement.querySelector('.popup__photo');

  if (elements && elements.length !== 0) {
    elements.forEach((generatedPhoto) => {
      const newPhotoElement = photo.cloneNode(true);
      newPhotoElement.setAttribute('src', generatedPhoto);
      photosContainer.appendChild(newPhotoElement);
    });
    photo.classList.add('hidden');
  } else {
    photosContainer.classList.add('hidden');
  }
};

const getFeatures = (elements, postElement) => {
  const offerFeaturesContainer = postElement.querySelector('.popup__features');

  if (elements && elements.length !== 0) {
    const featuresList = offerFeaturesContainer.querySelectorAll('.popup__feature');
    featuresList.forEach((featuresListItem) => {
      const isNecessary = elements.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`));
      if (!isNecessary) {
        featuresListItem.classList.add('hidden');
      }
    });
  } else {
    offerFeaturesContainer.classList.add('hidden');
  }
};

const checkAvailability = (element, value) => (value) ? value : element.classList.add('hidden');

const setTextContent = (className, element, postElement) => {
  const oneElement = postElement.querySelector(className);
  oneElement.textContent = checkAvailability(oneElement, element);
};

const createPost = (obj) => {
  const {avatar} = obj.author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = obj.offer;
  const postElement = postTemplate.cloneNode(true);

  setTextContent('.popup__title', title, postElement);
  setTextContent('.popup__text--address', address, postElement);
  setTextContent('.popup__text--price', `${price} ₽/ночь`, postElement);
  setTextContent('.popup__type', TYPES[type], postElement);
  setTextContent('.popup__text--time', `${rooms} комнаты для ${guests} гостей.`, postElement);
  setTextContent('.popup__text--capacity', `Заезд после ${checkin}, выезд до ${checkout}`, postElement);
  setTextContent('.popup__description', description, postElement);
  postElement.querySelector('.popup__avatar').src = avatar;
  getPhotos(photos, postElement);
  getFeatures(features, postElement);

  return postElement;
};

export {createPost};
