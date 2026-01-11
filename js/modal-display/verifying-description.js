const COMMENTLENGHT = 140;

const validateCommentLength = (value) => {
  if (!value || !value.trim()) {
    return true;
  }
  return value.length <= COMMENTLENGHT;
};

export {validateCommentLength};
