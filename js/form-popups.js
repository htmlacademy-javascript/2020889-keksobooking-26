const SUCCESS_MESSAGE_TIME = 1500;
const escapeButton = 27;

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageCloseButton = document.querySelector('.error__button');
const errorMessageText = document.querySelector('.error__message');

const showSuccessMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, SUCCESS_MESSAGE_TIME);
};

const showErrorMessage = (errorMessage) => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  errorMessageText.textContent = errorMessage;

  errorMessageCloseButton.addEventListener('click', () => {
    message.remove();
  });

  const onPopupEscKeydown = (evt) => {
    if (evt.keyCode === escapeButton) {
      document.removeEventListener('keydown', onPopupEscKeydown);
      message.remove();
    }
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  const onPopupClick = () => {
    document.removeEventListener('click', onPopupClick);
    message.remove();
  };

  document.addEventListener('click', onPopupClick);
};

export {showSuccessMessage, showErrorMessage};
