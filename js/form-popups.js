const SHOW_SUCCESS_MESSAGE_TIME = 1500;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showSuccessMessagePopup = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, SHOW_SUCCESS_MESSAGE_TIME);
};

const showErrorMessagePopup = (errorMessage) => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  const errorMessageCloseButton = document.querySelector('.error__button');
  const errorMessageText = document.querySelector('.error__message');
  errorMessageText.textContent = errorMessage;

  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });

  const eventOnEsc = (evt) => {
    if (evt.keyCode === 27) {
      message.remove();
      document.removeEventListener('keydown', eventOnEsc);
    }
  };

  document.addEventListener('keydown', eventOnEsc);


  const eventOnClick = () => {
    document.removeEventListener('click', eventOnClick);
    message.remove();
  };

  document.addEventListener('click', eventOnClick);
};

export {showSuccessMessagePopup, showErrorMessagePopup};
