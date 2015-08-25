export const UPDATE_TEXT_COLOR = 'UPDATE_TEXT_COLOR';
export const CORRECT_TEXT_COLOR = 'CORRECT_TEXT_COLOR';
export const UPDATE_FONT_SIZE = 'UPDATE_FONT_SIZE';
export const CORRECT_FONT_SIZE = 'CORRECT_FONT_SIZE';
export const TOGGLE_FONT_WEIGHT = 'TOGGLE_FONT_WEIGHT';
export const UPDATE_BACKGROUND_COLOR = 'UPDATE_BACKGROUND_COLOR';
export const CORRECT_BACKGROUND_COLOR = 'CORRECT_BACKGROUND_COLOR';
export const UPDATE_ACCESSIBILITY_LEVEL = 'UPDATE_ACCESSIBILITY_LEVEL';

export function updateTextColor(field, value) {
  return {
    type: UPDATE_TEXT_COLOR,
    field,
    value
  };
}

export function correctTextColor() {
  return {
    type: CORRECT_TEXT_COLOR
  };
}

export function updateFontSize(value) {
  return {
    type: UPDATE_FONT_SIZE,
    value
  };
}

export function correctFontSize() {
  return {
    type: CORRECT_FONT_SIZE
  };
}

export function toggleFontWeight() {
  return {
    type: TOGGLE_FONT_WEIGHT
  };
}

export function updateBackgroundColor(field, value) {
  return {
    type: UPDATE_BACKGROUND_COLOR,
    field,
    value
  };
}

export function correctBackgroundColor() {
  return {
    type: CORRECT_BACKGROUND_COLOR
  };
}

export function updateAccessibilityLevel(value) {
  return {
    type: UPDATE_ACCESSIBILITY_LEVEL,
    value
  };
}
