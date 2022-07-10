import {createPosts} from './data.js';

//const mapCanvas = document.querySelector('#map-canvas');
const similarPostTemplate = document.querySelector('#card').content.querySelector('.popup');
const postElement = similarPostTemplate.cloneNode(true);
const similarPosts = createPosts();

const getPhotos = (photos) => {
  const photosContainer = postElement.querySelector('.popup__photos');
  const photo = postElement.querySelector('.popup__photo');
  photo.remove();
  photos.forEach((generatedPhoto) => {
    const newPhotoElement = photo.cloneNode(true);
    newPhotoElement.setAttribute('src', generatedPhoto);
    photosContainer.appendChild(newPhotoElement);
  });
};

const createFeatures = (generatedFeatures) => {
  const featuresContainer = postElement.querySelector('.popup__features');
  const features = featuresContainer.querySelectorAll('.popup__feature');
  featuresContainer.innerHTML = '';
  for (let i = 0; i < generatedFeatures.length; i++) {
    featuresContainer.append(features[i]);
  }
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
  const allAvailableFeatures = postElement.querySelector('.popup__features');
  setTextContent('.popup__title', post.offer.title);
  setTextContent('.popup__text--address', `${post.offer.address.lat}, ${post.offer.address.lng}`);
  setTextContent('.popup__text--price', `${post.offer.price} ₽/ночь`);
  setTextContent('.popup__type', post.offer.type);
  setTextContent('.popup__text--time', `${post.offer.rooms} комнаты для ${post.offer.guests} гостей.`);
  setTextContent('.popup__text--capacity', `Заезд после ${post.offer.checkin}, выезд до ${post.offer.checkout}`);
  createFeatures(post.offer.features, allAvailableFeatures, postElement);
  setTextContent('.popup__description', post.offer.description);
  getPhotos(post.offer.photos, postElement);
  postElement.querySelector('.popup__avatar').src = post.author.avatar;
  //mapCanvas.append(postElement);
  return postElement;
};
export {createPost, similarPosts};
