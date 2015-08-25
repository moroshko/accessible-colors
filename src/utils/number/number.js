const INTEGER_REGEX = /^\d+$/;

function isStringInteger(str) {
  return INTEGER_REGEX.test(str);
}

function isIntegerInRange(str, min, max = Number.MAX_SAFE_INTEGER) {
  if (typeof str !== 'string') {
    return false;
  }

  str = str.trim();

  if (!isStringInteger(str)) {
    return false;
  }

  const integer = parseInt(str, 10);

  return integer >= min && integer <= max;
}

export default {
  isIntegerInRange
};
