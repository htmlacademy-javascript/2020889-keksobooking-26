const adForm = document.querySelector('.ad-form');
const allFieldsets = document.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const allMapFilter = document.querySelectorAll('.map__filter');

const setInactiveStatus = () => {
  adForm.classList.add('ad-form-disabled');

  allFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });

  mapFilters.classList.add('ad-form--disabled');

  allMapFilter.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', 'true');
  });
};
setInactiveStatus();

const setActiveStatus = () => {
  adForm.classList.remove('ad-form-disabled');

  allFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'true');
  });

  mapFilters.classList.remove('ad-form--disabled');

  allMapFilter.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled', 'true');
  });
};

export {setInactiveStatus, setActiveStatus};
