// 1pt = 1.333px according to http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#visual-audio-contrast-contrast-73-head
const PIXELS_IN_POINT = 1.333;

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#larger-scaledef
function isLargeScale(fontSize, fontSizeUnit, isFontBold) {
  const points = fontSizeInPt(fontSize, fontSizeUnit);

  return isFontBold ? (points >= 14) : (points >= 18);
}

function fontSizeInPt(fontSize, fontSizeUnit) {
  return (fontSizeUnit === 'pt') ? fontSize : Math.round(fontSize / PIXELS_IN_POINT);
}

function fontSizeInPx(fontSize, fontSizeUnit) {
  return (fontSizeUnit === 'px') ? fontSize : Math.round(fontSize * PIXELS_IN_POINT);
}

function accessibleContrast(accessibilityLevel, fontSize, fontSizeUnit, isFontBold) {
  switch (accessibilityLevel) {
    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
    case 'AA':
      return isLargeScale(fontSize, fontSizeUnit, isFontBold) ? 3 : 4.5;

    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7
    case 'AAA':
      return isLargeScale(fontSize, fontSizeUnit, isFontBold) ? 4.5 : 7;
  }

  return null;
}

export {
  accessibleContrast,
  fontSizeInPx
};
