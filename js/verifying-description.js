const COMMENTLENGHT = 140;

const validateCommentLength = (value) => {
  if (!value || !value.trim()) {
    return true; // Поле пустое - ок
  }
  return value.length <= COMMENTLENGHT; // Поле не пустое - проверяем длину
};

export {validateCommentLength};
