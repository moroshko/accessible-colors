import { MIN_FONT_SIZE } from 'constants';
import { str2hsl } from 'utils/color/color';
import { isIntegerInRange, correctInteger } from 'utils/number/number';
import { UPDATE_TEXT_COLOR, BLUR_TEXT_COLOR,
         UPDATE_FONT_SIZE, BLUR_FONT_SIZE,
         UPDATE_FONT_SIZE_UNIT, TOGGLE_FONT_WEIGHT,
         UPDATE_BACKGROUND_COLOR, BLUR_BACKGROUND_COLOR,
         UPDATE_ACCESSIBILITY_LEVEL,
         LOAD_GITHUB_STARS_SUCCESS, LOAD_TWITTER_COUNT_SUCCESS } from 'actions/app';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';
import colorReducer from 'reducers/color';


const defaults = {
  bg: 'EEEEEE',
  color: '747474',
  size: '18',
  format: 'px',
  weight: 'regular',
  design: 'aa'
};
const polyfilledParams = {
  get(key) {
    return defaults[key];
  }
};
// either use the URL or just ignore it since we cant parse it easily
const urlParams = typeof URLSearchParams === 'function' ? new URLSearchParams(window.location.search) : polyfilledParams;
const initialBackgroundColor = `#${urlParams.get('bg') || defaults['bg']}`;
const initialTextColor = `#${urlParams.get('color') || defaults['color']}`;
const initialBackgroundColorHSL = str2hsl(initialBackgroundColor);
const initialTextColorHSL = str2hsl(initialTextColor);
const initialState = {
  githubStars: '53',
  twitterCount: '0',
  textColor: {
    isValueValid: true,
    value: initialTextColor,
    isHueValid: true,
    hue: initialTextColorHSL.h.toString(),
    isSaturationValid: true,
    saturation: initialTextColorHSL.s.toString(),
    isLightnessValid: true,
    lightness: initialTextColorHSL.l.toString()
  },
  fontSize: {
    isValid: true,
    value: urlParams.get('size') || defaults['size']
  },
  fontSizeUnit: urlParams.get('format') || defaults['format'],
  isFontBold: (urlParams.get('weight') || defaults['weight']) === 'bold',
  backgroundColor: {
    isValueValid: true,
    value: initialBackgroundColor,
    isHueValid: true,
    hue: initialBackgroundColorHSL.h.toString(),
    isSaturationValid: true,
    saturation: initialBackgroundColorHSL.s.toString(),
    isLightnessValid: true,
    lightness: initialBackgroundColorHSL.l.toString()
  },
  accessibilityLevel: (urlParams.get('design') || defaults['design']).toUpperCase()
};

function updateUrl(key, value) {
  if (history.pushState && typeof URLSearchParams === 'function') {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);

    const path = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.pushState({ path }, '', path);
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT_COLOR:
      updateUrl('color', action.value.slice(1));
      return {
        ...state,
        textColor: colorReducer(state.textColor, {
          type: UPDATE_COLOR,
          field: action.field,
          value: action.value
        })
      };

    case BLUR_TEXT_COLOR:
      return {
        ...state,
        textColor: colorReducer(state.textColor, {
          type: CORRECT_COLOR
        })
      };

    case UPDATE_FONT_SIZE:
      updateUrl('size', action.value);
      return {
        ...state,
        fontSize: {
          isValid: isIntegerInRange(action.value, MIN_FONT_SIZE),
          value: action.value
        }
      };

    case BLUR_FONT_SIZE:
      return state.fontSize.isValid ? {
        ...state,
        fontSize: {
          ...state.fontSize,
          value: correctInteger(state.fontSize.value)
        }
      } : state;

    case UPDATE_FONT_SIZE_UNIT:
      updateUrl('format', action.value);
      return {
        ...state,
        fontSizeUnit: action.value
      };

    case TOGGLE_FONT_WEIGHT:
      updateUrl('weight', state.isFontBold ? 'regular' : 'bold');
      return {
        ...state,
        isFontBold: !state.isFontBold
      };

    case UPDATE_BACKGROUND_COLOR:
      updateUrl('bg', action.value.slice(1));
      return {
        ...state,
        backgroundColor: colorReducer(state.backgroundColor, {
          type: UPDATE_COLOR,
          field: action.field,
          value: action.value
        })
      };

    case BLUR_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: colorReducer(state.backgroundColor, {
          type: CORRECT_COLOR
        })
      };

    case UPDATE_ACCESSIBILITY_LEVEL:
      updateUrl('design', action.value);
      return {
        ...state,
        accessibilityLevel: action.value
      };

    case LOAD_GITHUB_STARS_SUCCESS:
      return {
        ...state,
        githubStars: action.starsCount
      };

    case LOAD_TWITTER_COUNT_SUCCESS:
      return {
        ...state,
        twitterCount: action.count
      };

    default:
      return state;
  }
};
