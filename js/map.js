import {setActiveStatus} from './dealing-with-form.js';
import {createProposition} from './generating-similar-elements.js';

const addressField = document.querySelector('#address');
const LAT_TOKYO = 35.68999;
const LNG_TOKYO = 139.69201;
const mapScope = 12;
const mapPic = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const mapLink = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mainPinPic = './img/main-pin.svg';
const mainPinSize = [52, 52];
const mainPinAnchor = [26, 52];
const simplePinPic = './img/pin.svg';
const simplePinSize = [40, 40];
const simplePinAnchor = [20, 40];
const LAT_LNG_TOKYO = {
  lat: LAT_TOKYO,
  lng: LNG_TOKYO
};
const map = L.map('map-canvas');

//Создаем основной маркер
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

//Устанавливаем карту и добавляем маркер
addressField.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;
map.on('load', () => {
  setActiveStatus();
})
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
mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});
mainPinMarker.addTo(map);


// Определяем фокус карты
const resetMap = () => {
  addressField.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;
  mainPinMarker.setLatLng({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
  });

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
  }, mapScope);
};

//Создаем второстепенные маркеры
const simplePinIcon = L.icon({
  iconUrl: simplePinPic,
  iconSize: simplePinSize,
  iconAnchor: simplePinAnchor,
});

const markerGroup = L.layerGroup().addTo(map);

const renderPin = (post) => {
  const pinMarker = L.marker(
    {
      lat: post.location.lat,
      lng: post.location.lng,
    },
    {
      icon: simplePinIcon,
    },
  );
  pinMarker.addTo(markerGroup).bindPopup(createProposition(post));
};

const renderPins = (array) => {
  array.slice(0, 10).forEach((post) => {
    renderPin(post);
  });
};

export {renderPins, resetMap};
