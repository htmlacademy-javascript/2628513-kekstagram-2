const isEscapeKey = (event) => event.key === 'Escape';

const clearInnerHTML = (element) => {
  element.innerHTML = '';
};

export {
  isEscapeKey,
  clearInnerHTML
};
