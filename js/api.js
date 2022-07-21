import {showSuccessMessage, showErrorMessage} from './form-popups.js';
import {resetForm, unblockSubmitButton, blockSubmitButton} from './user-form.js';

const API_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then((objects) => {
      onSuccess(objects);
    })
    .catch(() => {
      showErrorMessage('Не удалось загрузить данные, попробуйте перезагрузить страницу');
    });
};

const sendData = (body) => {
  blockSubmitButton();
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        showSuccessMessage();
        resetForm();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      showErrorMessage('Не удалось отправить объявление');
    }).finally(unblockSubmitButton);
};

export {getData, sendData};
