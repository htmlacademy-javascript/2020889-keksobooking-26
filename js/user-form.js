import {sendData} from './api.js';
import {resetMap} from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const START_SLIDER = 1000;
const INITIAL_VALUE = 1000;

const orderForm = document.querySelector('.ad-form');
const titleField = orderForm.querySelector('#title');
const adFormLabel = orderForm.querySelector('.ad-form__label');
const priceField = orderForm.querySelector('#price');
const capacityField = orderForm.querySelector('#capacity');
const roomNumberField = orderForm.querySelector('#room_number');
const typeField = orderForm.querySelector('#type');
const checkInField = orderForm.querySelector('#timein');
const checkOutField = orderForm.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = orderForm.querySelector('.ad-form__submit');
const resetFormButton = orderForm.querySelector('.ad-form__reset');
const formFilter = document.querySelector('.map__filters');
const formInteractiveElements = orderForm.querySelectorAll('fieldset');
const formFilterInteractiveElements = formFilter.querySelectorAll(['select', 'fieldset']);

const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__error', // Класс, обозначающий невалидное поле
  successClass: 'form__success', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

const maxCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const maxCapacityErrorMessage = {
  '1': 'для 1 гостя',
  '2': 'для 1-2 гостей',
  '3': 'для 1-3 гостей',
  '100': 'не для гостей',
};

const pricesOnType = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

//3.1. Заголовок объявления:
const validateTitleLength = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

titleField.oninput = function () {
  adFormLabel.textContent = `Заголовок объявления: использовано ${titleField.value.length}/100 символов`;
};

pristine.addValidator(
  titleField,
  validateTitleLength,
  'Заголовок должен быть от 30 до 100 символов',
);

//3.2. Цена за ночь:
const validatePriceValue = (value) => value <= MAX_PRICE;

pristine.addValidator(
  priceField,
  validatePriceValue,
  'Цена должна быть меньше 100,000',
);

//3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
//что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
const validateCapacityField = (value) => maxCapacity[roomNumberField.value].includes(value);

const dontValidateCapacityField = () => `${maxCapacityErrorMessage[roomNumberField.value]}`;

pristine.addValidator(
  capacityField,
  validateCapacityField,
  dontValidateCapacityField,
);

//При выборе комнаты, автоматом проставляется число людей
function changeRoomNumber () {
  pristine.validate(capacityField);
}

roomNumberField.addEventListener('change', changeRoomNumber);

//3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
const validateAddtionalPrice = (value) => pricesOnType[typeField.value] <= value;

const getAdditionalPriceError = () => `Минимальная цена ${pricesOnType[typeField.value]}`;

pristine.addValidator(
  priceField,
  validateAddtionalPrice,
  getAdditionalPriceError,
);

//3.5. Поля «Время заезда» и «Время выезда» синхронизированы:
const syncronizeCheckInAndOut = () => {
  checkInField.addEventListener('click', (evt) => {
    checkOutField.value = evt.target.value;
  });

  checkOutField.addEventListener('click', (evt) => {
    checkInField.value = evt.target.value;
  });
};
syncronizeCheckInAndOut();

//Пользователь может указать цену перемещением ползунка слайдера. Слайдер реализуется сторонней библиотекой noUiSlider.
typeField.addEventListener('change', () => {
  priceField.placeholder = pricesOnType[typeField.value];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: pricesOnType[typeField.value],
      max: MAX_PRICE
    },
    start: START_SLIDER,
  });
  pristine.validate(priceField);
});

priceField.value = INITIAL_VALUE;

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: START_SLIDER,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});


//dddd

const toggleFormFromEnabled = (value) => {
  orderForm.classList.toggle('ad-form--disabled', value);
  formFilter.classList.toggle('ad-form--disabled', value);

  formInteractiveElements.forEach((element) => {
    element.disabled = value;
  });

  formFilterInteractiveElements.forEach((element) => {
    element.disabled = value;
  });

  if (value) {
    priceField.placeholder = pricesOnType[typeField.value];
    priceField.min = pricesOnType[typeField.value];

    sliderElement.noUiSlider.updateOptions({
      start: pricesOnType[typeField.value],
      padding: [pricesOnType[typeField.value], 0],
    });
  }
};

//Кнопка отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const allowSubmitForm = () => {
  orderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    if(pristine.validate()) {
      sendData(formData);
    }
  });
};

//Очищение формы после отправки данных
const resetForm = () => {
  orderForm.reset();
  pristine.reset();
  resetMap();
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
  pristine.reset();
  sliderElement.noUiSlider.updateOptions({
    start: pricesOnType[typeField.value],
    padding: [pricesOnType[typeField.value], 0],
  });
});

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {toggleFormFromEnabled, allowSubmitForm, resetForm, unblockSubmitButton, blockSubmitButton};
