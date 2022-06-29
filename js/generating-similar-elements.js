import {createPosts} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarPostTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarPosts = createPosts();

const getPhotos = (randomPhoto, postElement) => {
  const photosContainer = postElement.querySelector('.popup__photos');
  const photoList = postElement.querySelector('.popup__photo');
  photoList.remove();
  randomPhoto.forEach((photo) => {
    const newPhotoElement = photoList.cloneNode(true);
    for (let i = 0; i < randomPhoto.length; i++){
      newPhotoElement.setAttribute('src', photo);
      photosContainer.appendChild(newPhotoElement);
    }
  });
};

const createFeatures = (randomFeature, popupFeatures) => {
  const featuresContainer = document.querySelector('#card').content.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featureListElement) => {
    const isNecessary = randomFeature.some(
      (feature) => featureListElement.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featureListElement.remove();
    }
  });
  popupFeatures.innerHTML = '';
  for (let i=0; i<randomFeature.length; i++) {
    popupFeatures.append(featuresList[i]);
  }
};

const createRandomPost = () => {
  similarPosts.forEach((post) => {
    const postElement = similarPostTemplate.cloneNode(true);
    const popupFeatures = postElement.querySelector('.popup__features');
    postElement.querySelector('.popup__title').textContent = post.offer.title;
    postElement.querySelector('.popup__text--address').textContent = `${post.offer.address.lat}, ${post.offer.address.lng}`;
    postElement.querySelector('.popup__text--price').textContent = `${post.offer.price} ₽/ночь`;
    postElement.querySelector('.popup__type').textContent = Object.values(post.offer.type);
    postElement.querySelector('.popup__text--time').textContent = `${post.offer.rooms} комнаты для ${post.offer.guests} гостей.`;
    postElement.querySelector('.popup__text--capacity').textContent = `Заезд после ${post.offer.checkin}, выезд до ${post.offer.checkout}`;
    createFeatures(post.offer.features, popupFeatures);
    postElement.querySelector('.popup__description').textContent = post.offer.description;
    getPhotos(post.offer.photos, postElement);
    postElement.querySelector('.popup__avatar').src = post.author.avatar;
    mapCanvas.append(postElement);
  });
};
createRandomPost();
