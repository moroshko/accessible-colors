import colorUtils from 'utils/color/color';
import { UPDATE_COLOR } from 'flux/constants/actionTypes/color';

export default function(state, action) {
  let { value, isValueValid,
        hue, isHueValid,
        saturation, isSaturationValid,
        lightness, isLightnessValid } = state;

  function updateHSLifValueValid() {
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

  function updateValueIfHSLvalid() {
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

  if (action.type !== UPDATE_COLOR) {
    return state;
  }

  switch (action.field) {
    case 'value':
      value = action.value;
      isValueValid = colorUtils.isValueValid(value);

      return updateHSLifValueValid();

    case 'hue':
      hue = action.value;
      isHueValid = colorUtils.isHueValid(hue);

      return updateValueIfHSLvalid();

    case 'saturation':
      saturation = action.value;
      isSaturationValid = colorUtils.isSaturationValid(saturation);

      return updateValueIfHSLvalid();

    case 'lightness':
      lightness = action.value;
      isLightnessValid = colorUtils.isLightnessValid(lightness);

      return updateValueIfHSLvalid();

    default:
      return state;
  }
}
