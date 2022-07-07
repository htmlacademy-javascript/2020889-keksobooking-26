const orderForm = document.querySelector('.ad-form');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 100000;

const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__error', // Класс, обозначающий невалидное поле
  successClass: 'form__success', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

//3.1. Заголовок объявления:
const titleField = orderForm.querySelector('#title');
const validateTitleLength = (value) => value.length >= MIN_TITLE_LENGTH && value.length <= MAX_TITLE_LENGTH;

pristine.addValidator(
  titleField,
  validateTitleLength,
  'Заголовок должен быть от 30 до 100 символов',
);

//3.2. Цена за ночь:
const priceField = orderForm.querySelector('#price');
const validatePriceValue = (value) => value <= MAX_PRICE;

pristine.addValidator(
  priceField,
  validatePriceValue,
  'Цена должна быть меньше 100,000',
);

//3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
//что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:
const capacityField = orderForm.querySelector('#capacity');
const roomNumberField = orderForm.querySelector('#room_number');

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

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
