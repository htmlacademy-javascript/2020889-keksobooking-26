import {getData} from './api.js';
import {clearPins, renderPins} from './map.js';
import {debounce} from './util.js';

const DEBOUNCE_DELAY = 500;
const MAX_NUMBER_OF_PINS = 10;
const SELECT_DEFAULT_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');

const PRICE_RANK = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: 100000,
  },
  any: {
    from: 0,
    to: 100000,
  },
};

const getFilteredPosts = (array) => {
  const filterType = (post) => typeFilter.value === post.offer.type || typeFilter.value === SELECT_DEFAULT_VALUE;
  const filterPrice = (post) => (post.offer.price >= PRICE_RANK[priceFilter.value].from && post.offer.price <= PRICE_RANK[priceFilter.value].to);
  const filterRooms = (post) => post.offer.rooms.toString() === roomsFilter.value || roomsFilter.value === SELECT_DEFAULT_VALUE;
  const filterGuests = (post) => post.offer.guests.toString() === guestsFilter.value || guestsFilter.value === SELECT_DEFAULT_VALUE;

  const filterFeatures = (post) => {
    const filtersFeatures = [];
    const checkedFilters = featuresFilter.querySelectorAll('input:checked');
    checkedFilters.forEach((el) => filtersFeatures.push(el.value));
    if (post.offer.features){
      return filtersFeatures.every((feature) => post.offer.features.includes(feature));
    }
    return false;
  };

  const filteredPosts = [];

  for (let i = 0; i < array.length; i++) {
    if(filterType(array[i]) && filterPrice(array[i]) && filterRooms(array[i]) && filterGuests(array[i]) && filterFeatures(array[i])) {
      filteredPosts.push(array[i]);
    }

    if(filteredPosts.length >= MAX_NUMBER_OF_PINS) {
      break;
    }
  }
  return filteredPosts;
};

const updateFilterHandler = () => {
  mapFilters.addEventListener('change', debounce(() => {
    getData((posts) => {
      clearPins();
      renderPins(getFilteredPosts(posts));
    });
  }, DEBOUNCE_DELAY)
  );
};

const startFilter = () => {
  getData((posts) => {
    clearPins(getFilteredPosts(posts));
  });
};

const resetMapFilters = () => {
  mapFilters.reset();
  getData((posts) => {
    clearPins();
    renderPins(getFilteredPosts(posts));
  });
};

export {resetMapFilters, startFilter, updateFilterHandler};
