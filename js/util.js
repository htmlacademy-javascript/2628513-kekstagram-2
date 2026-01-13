const isEscapeKey = (event) => event.key === 'Escape' || event.key === 'Esc';

const clearInnerHTML = (element) => {
  element.innerHTML = '';
};

export {
  isEscapeKey,
  clearInnerHTML
};

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {debounce};
