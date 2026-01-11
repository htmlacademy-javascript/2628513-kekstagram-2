const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error');

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

export {showErrorMessage, body};
