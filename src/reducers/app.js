import { MIN_FONT_SIZE } from 'constants';
import { str2hsl } from 'utils/color/color';
import { isIntegerInRange, correctInteger } from 'utils/number/number';
import { UPDATE_TEXT_COLOR, BLUR_TEXT_COLOR,
         UPDATE_FONT_SIZE, BLUR_FONT_SIZE,
         TOGGLE_FONT_WEIGHT,
         UPDATE_BACKGROUND_COLOR, BLUR_BACKGROUND_COLOR,
         UPDATE_ACCESSIBILITY_LEVEL,
         UPDATE_GRAPH_COLOR_TYPE, UPDATE_GRAPH_COLOR_PARAMETER,
         UPDATE_GRAPH_SLIDER_VALUE,
         LOAD_GITHUB_STARS_SUCCESS, LOAD_TWITTER_COUNT_SUCCESS } from 'actions/app';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';
import colorReducer from 'reducers/color';

function calcGraphState(stateTextColor, stateBackgroundColor, colorType, colorParameter) {
  const stateColor =
    colorType === 'textColor' ? stateTextColor : stateBackgroundColor;

  return {
    colorType,
    colorParameter,
    sliderValue: parseFloat(stateColor[colorParameter], 10)
  };
}

const initialBackgroundColorValue = '#EEEEEE';
const initialTextColorValue = '#747474';
const initialBackgroundColorHSL = str2hsl(initialBackgroundColorValue);
const initialTextColorHSL = str2hsl(initialTextColorValue);
const initialTextColor = {
  isValueValid: true,
  value: initialTextColorValue,
  isHueValid: true,
  hue: initialTextColorHSL.h.toString(),
  isSaturationValid: true,
  saturation: initialTextColorHSL.s.toString(),
  isLightnessValid: true,
  lightness: initialTextColorHSL.l.toString()
};
const initialBackgroundColor = {
  isValueValid: true,
  value: initialBackgroundColorValue,
  isHueValid: true,
  hue: initialBackgroundColorHSL.h.toString(),
  isSaturationValid: true,
  saturation: initialBackgroundColorHSL.s.toString(),
  isLightnessValid: true,
  lightness: initialBackgroundColorHSL.l.toString()
};
const initialGraphColorType = 'textColor';      // or 'backgroundColor'
const initialGraphColorParameter = 'lightness'; // or 'hue' or 'saturation'
const initialState = {
  githubStars: '32',
  twitterCount: '27',
  textColor: initialTextColor,
  fontSize: {
    isValid: true,
    value: '14'
  },
  isFontBold: false,
  backgroundColor: initialBackgroundColor,
  accessibilityLevel: 'AA',
  graph: calcGraphState(initialTextColor, initialBackgroundColor, initialGraphColorType, initialGraphColorParameter)
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

    case UPDATE_GRAPH_SLIDER_VALUE:
      return {
        ...state,
        graph: {
          ...state.graph,
          sliderValue: action.value
        }
      };

    case UPDATE_GRAPH_COLOR_TYPE:
      return {
        ...state,
        graph: calcGraphState(state.textColor, state.backgroundColor, action.value, state.graph.colorParameter)
      };

    case UPDATE_GRAPH_COLOR_PARAMETER:
      return {
        ...state,
        graph: calcGraphState(state.textColor, state.backgroundColor, state.graph.colorType, action.value)
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
