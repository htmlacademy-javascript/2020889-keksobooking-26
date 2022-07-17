import {setActiveStatus} from './dealing-with-form.js';
import {createPost, similarPosts} from './generating-similar-elements.js';

const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('#address');
const LAT_TOKYO = 35.68999;
const LNG_TOKYO = 139.69201;
const LAT_LNG_TOKYO = {
  lat: LAT_TOKYO,
  lng: LNG_TOKYO
};
const mapScope = 10;
const mapPic = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapLink = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mainPinPic = './img/main-pin.svg';
const mainPinSize = [52, 52];
const mainPinAnchor = [26, 52];
const simplePinPic = './img/pin.svg';
const simplePinSize = [40, 40];
const simplePinAnchor = [20, 40];

const map = L.map('map-canvas').on('load', setActiveStatus)
  .setView(
    LAT_LNG_TOKYO,
    mapScope
  );

L.tileLayer(
  mapPic,
  {
    attribution: mapLink,
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainPinPic,
  iconSize: mainPinSize,
  iconAnchor: mainPinAnchor,
});

const mainPinMarker = L.marker(
  LAT_LNG_TOKYO,
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
  }, mapScope);
});

const simplePinIcon = L.icon({
  iconUrl: simplePinPic,
  iconSize: simplePinSize,
  iconAnchor: simplePinAnchor,
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
