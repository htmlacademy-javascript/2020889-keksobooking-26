import {TYPES} from './data.js';

const postTemplate = document.querySelector('#card').content.querySelector('.popup');

const createProposition = (obj) => {
  const {avatar} = obj.author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = obj.offer;
  const postElement = postTemplate.cloneNode(true);

  const getPhotos = (availablePhotos) => {
    const photosContainer = postElement.querySelector('.popup__photos');
    const photo = postElement.querySelector('.popup__photo');

    if (photos) {
      availablePhotos.forEach((generatedPhoto) => {
        const newPhotoElement = photo.cloneNode(true);
        newPhotoElement.setAttribute('src', generatedPhoto);
        photosContainer.appendChild(newPhotoElement);
      });
      photo.classList.add('hidden');
    } else {
      photosContainer.classList.add('hidden');
    }
  };

  const getFeatures = () => {
    const offerFeaturesContainer = postElement.querySelector('.popup__features');

    if (features) {
      const featuresList = offerFeaturesContainer.querySelectorAll('.popup__feature');
      featuresList.forEach((featuresListItem) => {
        const isNecessary = features.some(
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

  const setTextContent = (className, element) => {
    const oneElement = postElement.querySelector(className);
    oneElement.textContent = checkAvailability(oneElement, element);
  };

  setTextContent('.popup__title', title);
  setTextContent('.popup__text--address', address);
  setTextContent('.popup__text--price', `${price} ₽/ночь`);
  setTextContent('.popup__type', TYPES[type]);
  setTextContent('.popup__text--time', `${rooms} комнаты для ${guests} гостей.`);
  setTextContent('.popup__text--capacity', `Заезд после ${checkin}, выезд до ${checkout}`);
  setTextContent('.popup__description', description);
  postElement.querySelector('.popup__avatar').src = avatar;
  getPhotos(photos);
  getFeatures();
  return postElement;
};

export {createProposition};
