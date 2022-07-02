const setInactiveStatus = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form-disabled');
  const allFieldsets = document.querySelectorAll('fieldset');
  allFieldsets.forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'true');
  });
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('ad-form--disabled');
  const allMapFilter = document.querySelectorAll('.map__filter');
  allMapFilter.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', 'true');
  });
};
setInactiveStatus();

const setActiveStatus = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form-disabled');
  const allFieldsets = document.querySelectorAll('fieldset');
  allFieldsets.forEach((fieldset) => {
    fieldset.removeAttribute('disabled', 'true');
  });
  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('ad-form--disabled');
  const allMapFilter = document.querySelectorAll('.map__filter');
  allMapFilter.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled', 'true');
  });
};
setActiveStatus();
export {setInactiveStatus, setActiveStatus};
