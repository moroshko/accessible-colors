// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#larger-scaledef
function isLargeScale(fontSize, isFontBold) {
  return isFontBold ? (fontSize >= 14) : (fontSize >= 18);
}

function accessibleContrast(accessibilityLevel, fontSize, isFontBold) {
  switch (accessibilityLevel) {
    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
    case 'AA':
      return isLargeScale(fontSize, isFontBold) ? 3 : 4.5;

    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7
    case 'AAA':
      return isLargeScale(fontSize, isFontBold) ? 4.5 : 7;
  }

  return null;
}

export default {
  accessibleContrast
};
