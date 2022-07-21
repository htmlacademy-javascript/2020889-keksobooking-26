const SUCCESS_MESSAGE_TIME = 1500;

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

export {showSuccessMessage, showErrorMessage};
