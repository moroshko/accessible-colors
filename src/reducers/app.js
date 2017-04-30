import { MIN_FONT_SIZE } from 'constants';
import { str2hsl } from 'utils/color/color';
import { isIntegerInRange, correctInteger } from 'utils/number/number';
import { UPDATE_TEXT_COLOR, BLUR_TEXT_COLOR,
         UPDATE_FONT_SIZE, BLUR_FONT_SIZE,
         UPDATE_FONT_UNIT_OF_MEASURE, TOGGLE_FONT_WEIGHT,
         UPDATE_BACKGROUND_COLOR, BLUR_BACKGROUND_COLOR,
         UPDATE_ACCESSIBILITY_LEVEL,
         LOAD_GITHUB_STARS_SUCCESS, LOAD_TWITTER_COUNT_SUCCESS } from 'actions/app';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';
import colorReducer from 'reducers/color';

const initialBackgroundColor = '#EEEEEE';
const initialTextColor = '#747474';
const initialBackgroundColorHSL = str2hsl(initialBackgroundColor);
const initialTextColorHSL = str2hsl(initialTextColor);
const initialState = {
  githubStars: '51',
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
    value: '18'
  },
  fontUnitOfMeasure: 'px',
  isFontBold: false,
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
  accessibilityLevel: 'AA'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT_COLOR:
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

    case UPDATE_FONT_UNIT_OF_MEASURE:
      return {
        ...state,
        fontUnitOfMeasure: action.value
      };

    case TOGGLE_FONT_WEIGHT:
      return {
        ...state,
        isFontBold: !state.isFontBold
      };

    case UPDATE_BACKGROUND_COLOR:
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
