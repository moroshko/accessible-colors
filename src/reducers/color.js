import colorUtils from 'utils/color/color';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';

function updateHSLifValueValid(newState) {
  let { isValueValid, value,
        isHueValid, hue,
        isSaturationValid, saturation,
        isLightnessValid, lightness } = newState;

  if (isValueValid) {
    const { h, s, l } = colorUtils.str2hsl(value);

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
    value = colorUtils.hsl2str({
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
        isValueValid: colorUtils.isValueValid(action.value),
        value: action.value
      });

    case 'hue':
      return updateValueIfHSLvalid({
        ...state,
        isHueValid: colorUtils.isHueValid(action.value),
        hue: action.value
      });

    case 'saturation':
      return updateValueIfHSLvalid({
        ...state,
        isSaturationValid: colorUtils.isSaturationValid(action.value),
        saturation: action.value
      });

    case 'lightness':
      return updateValueIfHSLvalid({
        ...state,
        isLightnessValid: colorUtils.isLightnessValid(action.value),
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
      return state;

    default:
      return state;
  }
}
