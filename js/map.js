import {setActiveStatus} from './dealing-with-form.js';
import {createPost, similarPosts} from './generating-similar-elements.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');

const map = L.map('map-canvas').on('load', setActiveStatus)
  .setView({
    lat: 35.65283,
    lng: 139.83947
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.65283,
    lng: 139.83947
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.65283,
    lng: 139.83947
  });

  map.setView({
    lat: 35.65283,
    lng: 139.83947
  }, 10);
});

const simplePinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

similarPosts.forEach((post) => {
  const {
    location: {
      lat,
      lng
    },
    // offer: {
    //   title
    // }
  } = post;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: simplePinIcon,
  },
  );
  marker
    .addTo(map)
    .bindPopup(createPost(post));
});
