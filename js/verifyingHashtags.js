
const COUNT_HASHTAG = 5;
const getHashtags = (valueStr) => {//Извлекает массив хэштегов из строки.

  if (!valueStr || !valueStr.trim()) {// Если поле пустое, возвращаем пустой массив
    return [];
  }
  return valueStr.trim().split(/\s+/);
};

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const validateFormat = (value) => {//Проверяет формат КАЖДОГО хэштега
  const hashtags = getHashtags(value);
  // Если хэштегов нет, то формат верный.
  // Иначе, проверяем, что КАЖДЫЙ хэштег соответствует формату.
  return hashtags.length === 0 || hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateCount = (value) => {//Проверяет количество хэштегов
  const hashtags = getHashtags(value);
  return hashtags.length <= COUNT_HASHTAG;
};

const validateUniqueness = (value) => {//Проверяет хэштеги на уникальность (без учета регистра)
  const hashtags = getHashtags(value);
  const lowercasedHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowercasedHashtags);
  return uniqueHashtags.size === lowercasedHashtags.length;// Если размеры массива и Set совпадают, значит, дубликатов нет.
};

export {
  validateFormat,
  validateCount,
  validateUniqueness,
};
