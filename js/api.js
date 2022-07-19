import {showSuccessMessagePopup, showErrorMessagePopup} from './form-popups.js';
import {resetForm, unblockSubmitButton, blockSubmitButton} from './user-form.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((objects) => {
      onSuccess(objects);
    })
    .catch(() => {
      showErrorMessagePopup('Не удалось загрузить объекты, попробуйте перезагрузить страницу');
    });
};

const sendData = (body) => {
  blockSubmitButton();
  fetch(
    'https://26.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessagePopup();
        resetForm();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showErrorMessagePopup('Не удалось отправить объявление');
    }).finally(() => {
      unblockSubmitButton();
    });
};

export {getData, sendData};
