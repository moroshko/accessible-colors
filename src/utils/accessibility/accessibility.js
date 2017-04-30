// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#larger-scaledef
function isLargeScale(fontSize, isFontBold) {
  return isFontBold ? (fontSize >= 14) : (fontSize >= 18);
}

function fontSizeInPt(fontSize,fontUnitOfMeasure) {
  // http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#visual-audio-contrast-contrast-73-head
  return (fontUnitOfMeasure === 'pt') ? fontSize : Math.round(fontSize * 0.75);
}

function fontSizeInPx(fontSize,fontUnitOfMeasure) {
  // http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#visual-audio-contrast-contrast-73-head
  return (fontUnitOfMeasure === 'pt') ? Math.round(fontSize * 1.333) : fontSize;
}


function accessibleContrast(accessibilityLevel, fontSize, isFontBold, fontUnitOfMeasure) {
  switch (accessibilityLevel) {
    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast
    case 'AA':
      return isLargeScale(fontSizeInPt(fontSize,fontUnitOfMeasure), isFontBold) ? 3 : 4.5;

    // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast7
    case 'AAA':
      return isLargeScale(fontSizeInPt(fontSize,fontUnitOfMeasure), isFontBold) ? 4.5 : 7;
  }

  return null;
}

export {
  accessibleContrast,
  fontSizeInPx
};
