const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

// Объявляем функцию closeMessage перед использованием
function closeMessage(element) {
  element.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
}

// Объявляем обработчики как function declarations
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    const message = document.querySelector('.success') || document.querySelector('.error');
    if (message) {
      closeMessage(message);
    }
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  const message = document.querySelector('.success') || document.querySelector('.error');
  if (message) {
    closeMessage(message);
  }
}

const showSuccessMessage = () => {
  const success = successTemplate.cloneNode(true);
  body.appendChild(success);

  const successButton = success.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    closeMessage(success);
  });

  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
};


const showErrorMessage = (message) => {
  if (!dataErrorTemplate) {
    return;
  }

  const errorArea = dataErrorTemplate.content.querySelector('.data-error').cloneNode(true);

  if (message) {
    const titleEl = errorArea.querySelector('.data-error__title');
    if (titleEl) {
      titleEl.textContent = message;
    }
  }

  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    if (errorLoadDataArea) {
      errorLoadDataArea.remove();
    }
  }, REMOVE_MESSAGE_TIMEOUT);
};

export {showErrorMessage, showSuccessMessage};
