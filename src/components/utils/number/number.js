const INTEGER_REGEX = /^\d+$/;

function isInteger(str) {
  return INTEGER_REGEX.test(str);
}

function isIntegerInRange(str, min, max) {
  if (!isInteger(str)) {
    return false;
  }

  const integer = parseInt(str, 10);

  return integer >= min && integer <= max;
}

export default {
  isIntegerInRange
};
