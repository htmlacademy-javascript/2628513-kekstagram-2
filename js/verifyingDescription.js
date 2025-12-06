const validateCommentLength = (value) => {
  if (!value || !value.trim()) {
    return true; // Поле пустое - ок
  }
  return value.length <= 140; // Поле не пустое - проверяем длину
};

export {validateCommentLength};
