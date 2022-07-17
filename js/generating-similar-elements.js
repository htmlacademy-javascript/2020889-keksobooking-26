import {createPosts} from './data.js';

const similarPostTemplate = document.querySelector('#card').content.querySelector('.popup');
const postElement = similarPostTemplate.cloneNode(true);
const similarPosts = createPosts();

const getPhotos = (photos) => {
  const photosContainer = postElement.querySelector('.popup__photos');
  const photo = postElement.querySelector('.popup__photo');
  photos.forEach((generatedPhoto) => {
    const newPhotoElement = photo.cloneNode(true);
    newPhotoElement.setAttribute('src', generatedPhoto);
    photosContainer.appendChild(newPhotoElement);
  });
  photo.classList.add('hidden');
};

const createFeatures = (features) => {
  const featureContainer = postElement.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add(`popup__feature--${feature}`);
    featureContainer.appendChild(li);
  });
};

const setTextContent = (className, generatedElement, noData = '') => {
  const oneElement = postElement.querySelector(className);
  for (let i = 0; i < generatedElement.length; i++) {
    if (!generatedElement[i]) {
      oneElement.classList.add('hidden');
      return;
    }
    oneElement.textContent = noData ? noData : generatedElement;
  }
};

const createPost = (post) => {
  setTextContent('.popup__title', post.offer.title);
  setTextContent('.popup__text--address', `${post.offer.address.lat}, ${post.offer.address.lng}`);
  setTextContent('.popup__text--price', `${post.offer.price} ₽/ночь`);
  setTextContent('.popup__type', post.offer.type);
  setTextContent('.popup__text--time', `${post.offer.rooms} комнаты для ${post.offer.guests} гостей.`);
  setTextContent('.popup__text--capacity', `Заезд после ${post.offer.checkin}, выезд до ${post.offer.checkout}`);
  createFeatures(post.offer.features);
  setTextContent('.popup__description', post.offer.description);
  getPhotos(post.offer.photos);
  postElement.querySelector('.popup__avatar').src = post.author.avatar;
  return postElement;
};
export {createPost, similarPosts};
