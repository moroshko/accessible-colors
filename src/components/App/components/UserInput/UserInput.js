import styles from './UserInput.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MIN_FONT_SIZE, MAX_FONT_SIZE } from 'constants';
import { updateTextColor, blurTextColor, updateFontSize, blurFontSize,
         toggleFontWeight, updateBackgroundColor, blurBackgroundColor,
         updateAccessibilityLevel } from 'actions/app';
import Editable from 'Editable/Editable';
import Toggle from 'Toggle/Toggle';

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor,
    accessibilityLevel: state.accessibilityLevel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTextColor: value => dispatch(updateTextColor('value', value)),
    blurTextColor: () => dispatch(blurTextColor()),
    updateFontSize: value => dispatch(updateFontSize(value)),
    blurFontSize: () => dispatch(blurFontSize()),
    toggleFontWeight: () => dispatch(toggleFontWeight()),
    updateBackgroundColor: value => dispatch(updateBackgroundColor('value', value)),
    blurBackgroundColor: () => dispatch(blurBackgroundColor()),
    updateAccessibilityLevel: value => dispatch(updateAccessibilityLevel(value))
  };
}

function UserInput(props) {
  const { textColor, fontSize, isFontBold, backgroundColor,
          accessibilityLevel, updateTextColor,
          blurTextColor, updateFontSize, blurFontSize,
          toggleFontWeight, updateBackgroundColor, blurBackgroundColor,
          updateAccessibilityLevel } = props;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.textColorAndFontWeightContainer}>
          <span className={styles.textColorContainer}>
            <label htmlFor="text-color">My text color is </label>
            <span className={styles.colorContainer}>
              <Editable isValid={textColor.isValueValid}
                        onChange={updateTextColor}
                        inputProps={{
                          id: 'text-color',
                          type: 'text',
                          value: textColor.value,
                          onBlur: blurTextColor
                        }} />
            </span>
          </span>
          {' '}
          <span className={styles.fontSizeAndWeightContainer}>
            <label htmlFor="font-size">at </label>
            <span className={styles.fontSizeContainer}>
              <Editable isValid={fontSize.isValid}
                        onChange={updateFontSize}
                        inputProps={{
                          id: 'font-size',
                          type: 'number',
                          min: MIN_FONT_SIZE,
                          max: MAX_FONT_SIZE,
                          value: fontSize.value,
                          onBlur: blurFontSize
                        }} />
            </span>
            pt and
            <span className={styles.fontWeightContainer}>
              <Toggle values={['regular', 'bold']}
                      currentValue={isFontBold ? 'bold' : 'regular'}
                      onChange={toggleFontWeight} />
            </span>
            weight
          </span>
        </p>
        <p className={styles.backgroundColorContainer}>
          <label htmlFor="background-color">My background color is </label>
          <span className={styles.colorContainer}>
            <Editable isValid={backgroundColor.isValueValid}
                      onChange={updateBackgroundColor}
                      inputProps={{
                        id: 'background-color',
                        type: 'text',
                        value: backgroundColor.value,
                        onBlur: blurBackgroundColor
                      }} />
          </span>
        </p>
        <p className={styles.accessibilityLevelContainer}>
          My design must be
          <Toggle values={['AA', 'AAA']}
                  currentValue={accessibilityLevel}
                  onChange={updateAccessibilityLevel} />
          compliant
        </p>
        {
          (!textColor.isValueValid || !backgroundColor.isValueValid || !fontSize.isValid) &&
            <div className={styles.errorsContainer}>
              {
                (!textColor.isValueValid || !backgroundColor.isValueValid) &&
                  <p className={styles.error}>
                    Enter a valid hexadecimal color
                  </p>
              }
              {
                !fontSize.isValid &&
                  <p className={styles.error}>
                    Enter a font size of {MIN_FONT_SIZE}px or above
                  </p>
              }
            </div>
        }
      </div>
    </div>
  );
}

UserInput.propTypes = {
  textColor: PropTypes.object.isRequired,
  fontSize: PropTypes.object.isRequired,
  isFontBold: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.object.isRequired,
  accessibilityLevel: PropTypes.string.isRequired,

  updateTextColor: PropTypes.func.isRequired,
  blurTextColor: PropTypes.func.isRequired,
  updateFontSize: PropTypes.func.isRequired,
  blurFontSize: PropTypes.func.isRequired,
  toggleFontWeight: PropTypes.func.isRequired,
  updateBackgroundColor: PropTypes.func.isRequired,
  blurBackgroundColor: PropTypes.func.isRequired,
  updateAccessibilityLevel: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
