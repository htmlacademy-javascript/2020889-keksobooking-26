import {setActiveStatus} from './dealing-with-form.js';
import {createPost} from './generating-similar-elements.js';

const LAT_TOKYO = 35.68999;
const LNG_TOKYO = 139.69201;
const MAP_SCOPE = 12;
const MAX_NUMBER_OF_PINS = 10;
const MAP_PIC = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_LINK = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAIN_PIN_LINK = './img/main-pin.svg';
const SIMPLE_PIN_PIC = './img/pin.svg';

const mainPinSize = [52, 52];
const mainPinAnchor = [26, 52];
const simplePinSize = [40, 40];
const simplePinAnchor = [20, 40];
const LAT_LNG_TOKYO = {
  lat: LAT_TOKYO,
  lng: LNG_TOKYO
};

const addressField = document.querySelector('#address');
const map = L.map('map-canvas');

//Создаем основной маркер
const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_LINK,
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
    MAP_SCOPE
  );

L.tileLayer(
  MAP_PIC,
  {
    attribution: MAP_LINK,
  },
).addTo(map);
mainPinMarker.on('moveend', (evt) => {
  addressField.value = evt.target.getLatLng();
});
mainPinMarker.addTo(map);


// Определяем фокус карты
const resetMap = () => {
  addressField.value = `${LAT_TOKYO}, ${LNG_TOKYO}`;

  map.setView({
    lat: LAT_TOKYO,
    lng: LNG_TOKYO
  }, MAP_SCOPE);
};

//Создаем второстепенные маркеры
const simplePinIcon = L.icon({
  iconUrl: SIMPLE_PIN_PIC,
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
  pinMarker.addTo(markerGroup).bindPopup(createPost(post));
};

const renderPins = (array) => {
  array.slice(0, MAX_NUMBER_OF_PINS).forEach((post) => {
    renderPin(post);
  });
};

const clearPins = () => {
  markerGroup.clearLayers();
};

export {renderPins, resetMap, clearPins};
