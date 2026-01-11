
const COUNT_HASHTAG = 5;
const getHashtags = (valueStr) => {

  if (!valueStr || !valueStr.trim()) {
    return [];
  }
  return valueStr.trim().split(/\s+/);
};

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const validateFormat = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === 0 || hashtags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= COUNT_HASHTAG;
};

const validateUniqueness = (value) => {
  const hashtags = getHashtags(value);
  const lowercasedHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowercasedHashtags);
  return uniqueHashtags.size === lowercasedHashtags.length;
};

export { validateFormat, validateCount, validateUniqueness };
