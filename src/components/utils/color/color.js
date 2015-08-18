const FLOAT_REGEX = /^\d+(\.\d+)?$/;
const THREE_DIGIT_HEX_COLOR_REGEX = /^#[0-9a-fA-F]{3}$/;
const SIX_DIGIT_HEX_COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

function isFloatInRange(str, min, max) {
  if (!FLOAT_REGEX.test(str)) {
    return false;
  }

  const float = parseFloat(str);

  return float >= min && float <= max;
}

function str2sixDigitHex(str) {
  if (SIX_DIGIT_HEX_COLOR_REGEX.test(str)) {
    return str;
  }

  if (THREE_DIGIT_HEX_COLOR_REGEX.test(str)) {
    return '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
  }

  return null;
}

function rgb2sixDigitHex({ r, g, b }) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) {
    r = '0' + r;
  }

  if (g.length === 1) {
    g = '0' + g;
  }

  if (b.length === 1) {
    b = '0' + b;
  }

  return '#' + r + g + b;
}

function isValueValid(str) {
  return str2sixDigitHex(str) !== null;
}

function isHueValid(str) {
  return isFloatInRange(str, 0, 360);
}

function isSaturationValid(str) {
  return isFloatInRange(str, 0, 100);
}

function isLightnessValid(str) {
  return isFloatInRange(str, 0, 100);
}

function str2rgb(str) {
  const sixDigitHex = str2sixDigitHex(str);

  if (sixDigitHex === null) {
    return null;
  }

  return {
    r: parseInt(sixDigitHex.slice(1, 3), 16),
    g: parseInt(sixDigitHex.slice(3, 5), 16),
    b: parseInt(sixDigitHex.slice(5, 7), 16)
  };
}

function rgb2hsl({ r, g, b }) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;

  let h, s, l;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  s = s * 100;
  l = l * 100;

  return { h, s, l };
}

function hsl2rgb({ h, s, l }) {
  var r, g, b, m, c, x;

  if (!isFinite(h)) {
    h = 0;
  }

  if (!isFinite(s)) {
    s = 0;
  }

  if (!isFinite(l)) {
    l = 0;
  }

  h /= 60;

  if (h < 0) {
    h = 6 - (-h % 6);
  }

  h %= 6;

  s = Math.max(0, Math.min(1, s / 100));
  l = Math.max(0, Math.min(1, l / 100));

  c = (1 - Math.abs((2 * l) - 1)) * s;
  x = c * (1 - Math.abs((h % 2) - 1));

  if (h < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  m = l - c / 2;
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function str2hsl(str) {
  const sixDigitHex = str2sixDigitHex(str);

  if (sixDigitHex === null) {
    return null;
  }

  const rgb = str2rgb(sixDigitHex);

  if (rgb === null) {
    return null;
  }

  return rgb2hsl(rgb);
}

function hsl2str(hsl) {
  const rgb = hsl2rgb(hsl);

  return rgb2sixDigitHex(rgb);
}

// http://www.w3.org/WAI/GL/wiki/Relative_luminance
function relativeLuminance({ r, g, b }) {
  [r, g, b] = [r, g, b].map(c => {
    c = c / 255;

    if (c <= 0.03928) {
      return c / 12.92;
    }

    return Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#key-terms
function contrast(str1, str2) {
  const L1 = relativeLuminance(str2rgb(str1));
  const L2 = relativeLuminance(str2rgb(str2));

  if (L1 < L2) {
    return (L2 + 0.05) / (L1 + 0.05);
  }

  return (L1 + 0.05) / (L2 + 0.05);
}

function findClosestAccessibleDarkerColor(adjustableColor, otherColor, contrastRatio) {
  let { h, s, l } = str2hsl(adjustableColor);

  if (contrast(adjustableColor, otherColor) >= contrastRatio) {
    return {
      color: adjustableColor,
      lightness: l
    };
  }

  let minColor = hsl2str({ h, s, l: 0 });

  if (contrast(minColor, otherColor) < contrastRatio) {
    return null;
  }

  let min = 0, max = l, maxColor = hsl2str({ h, s, l });
  let lastMinColor, lastMaxColor;

  while (minColor !== lastMinColor || maxColor !== lastMaxColor) {
    lastMinColor = minColor;
    lastMaxColor = maxColor;

    l = (min + max) / 2;
    adjustableColor = hsl2str({ h, s, l });

    if (contrast(adjustableColor, otherColor) < contrastRatio) {
      max = l;
      maxColor = hsl2str({ h, s, l });
    } else {
      min = l;
      minColor = hsl2str({ h, s, l });
    }
  }

  return {
    color: minColor,
    lightness: min
  };
}

function findClosestAccessibleLighterColor(adjustableColor, otherColor, contrastRatio) {
  let { h, s, l } = str2hsl(adjustableColor);

  if (contrast(adjustableColor, otherColor) >= contrastRatio) {
    return {
      color: adjustableColor,
      lightness: l
    };
  }

  let maxColor = hsl2str({ h, s, l: 100 });

  if (contrast(maxColor, otherColor) < contrastRatio) {
    return null;
  }

  let min = l, max = 100, minColor = hsl2str({ h, s, l });
  let lastMinColor, lastMaxColor;

  while (minColor !== lastMinColor || maxColor !== lastMaxColor) {
    lastMinColor = minColor;
    lastMaxColor = maxColor;

    l = (min + max) / 2;
    adjustableColor = hsl2str({ h, s, l });

    if (contrast(adjustableColor, otherColor) < contrastRatio) {
      min = l;
      minColor = hsl2str({ h, s, l });
    } else {
      max = l;
      maxColor = hsl2str({ h, s, l });
    }
  }

  return {
    color: maxColor,
    lightness: max
  };
}

function findClosestAccessibleColor(adjustableColor, otherColor, contrastRatio) {
  const closestDarkerColor =
    findClosestAccessibleDarkerColor(adjustableColor, otherColor, contrastRatio);
  const closestLighterColor =
    findClosestAccessibleLighterColor(adjustableColor, otherColor, contrastRatio);

  if (closestDarkerColor === null) {
    if (closestLighterColor === null) {
      return null;
    }

    return closestLighterColor.color;
  }

  if (closestLighterColor === null) {
    return closestDarkerColor.color;
  }

  const { l } = str2hsl(adjustableColor);

  if (closestLighterColor.lightness - l < l - closestDarkerColor.lightness) {
    return closestLighterColor.color;
  }

  return closestDarkerColor.color;
}

function randomColor() {
  return rgb2sixDigitHex({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  });
}

export default {
  isValueValid,
  isHueValid,
  isSaturationValid,
  isLightnessValid,
  contrast,
  str2hsl,
  hsl2str,
  findClosestAccessibleColor,
  randomColor
};
