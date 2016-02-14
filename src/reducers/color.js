import {
  str2hsl,
  hsl2str,
  isValueValid,
  isHueValid,
  isSaturationValid,
  isLightnessValid,
  correctValue
} from 'utils/color/color';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';

function updateHSLifValueValid(newState) {
  let { isValueValid, value,
        isHueValid, hue,
        isSaturationValid, saturation,
        isLightnessValid, lightness } = newState;

  if (isValueValid) {
    const { h, s, l } = str2hsl(value);

    isHueValid = true;
    hue = h.toString();
    isSaturationValid = true;
    saturation = s.toString();
    isLightnessValid = true;
    lightness = l.toString();
  }

  return {
    isValueValid,
    value,
    isHueValid,
    hue,
    isSaturationValid,
    saturation,
    isLightnessValid,
    lightness
  };
}

function updateValueIfHSLvalid(newState) {
  let { isValueValid, value,
        isHueValid, hue,
        isSaturationValid, saturation,
        isLightnessValid, lightness } = newState;

  if (isHueValid && isSaturationValid && isLightnessValid) {
    isValueValid = true;
    value = hsl2str({
      h: parseFloat(hue),
      s: parseFloat(saturation),
      l: parseFloat(lightness)
    });
  }

  return {
    isValueValid,
    value,
    isHueValid,
    hue,
    isSaturationValid,
    saturation,
    isLightnessValid,
    lightness
  };
}

function handleUpdateColor(state, action) {
  switch (action.field) {
    case 'value':
      return updateHSLifValueValid({
        ...state,
        isValueValid: isValueValid(action.value),
        value: action.value.toUpperCase()
      });

    case 'hue':
      return updateValueIfHSLvalid({
        ...state,
        isHueValid: isHueValid(action.value),
        hue: action.value
      });

    case 'saturation':
      return updateValueIfHSLvalid({
        ...state,
        isSaturationValid: isSaturationValid(action.value),
        saturation: action.value
      });

    case 'lightness':
      return updateValueIfHSLvalid({
        ...state,
        isLightnessValid: isLightnessValid(action.value),
        lightness: action.value
      });

    default:
      return state;
  }
}

export default (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return handleUpdateColor(state, action);

    case CORRECT_COLOR:
      return state.isValueValid ? {
        ...state,
        value: correctValue(state.value)
      } : state;

    default:
      return state;
  }
};
