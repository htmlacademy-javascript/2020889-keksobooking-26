import {setActiveStatus} from './dealing-with-form.js';
import {createPost, similarPosts} from './generating-similar-elements.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const LAT_TOKYO = 35.68999;
const LNG_TOKYO = 139.69201;

const map = L.map('map-canvas').on('load', setActiveStatus)
  .setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
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
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
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
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
  });

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
  }, 10);
});

const simplePinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);
similarPosts.forEach((post) => {
  const {
    location: {
      lat,
      lng
    },
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
    .addTo(markerGroup)
    .bindPopup(createPost(post));
});
