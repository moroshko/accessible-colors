import styles from './UserInput.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateTextColor, correctTextColor, updateFontSize, correctFontSize,
         toggleFontWeight, updateBackgroundColor, correctBackgroundColor,
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
    correctTextColor: value => dispatch(correctTextColor()),
    updateFontSize: value => dispatch(updateFontSize(value)),
    correctFontSize: value => dispatch(correctFontSize(value)),
    toggleFontWeight: () => dispatch(toggleFontWeight()),
    updateBackgroundColor: value => dispatch(updateBackgroundColor('value', value)),
    correctBackgroundColor: value => dispatch(correctBackgroundColor()),
    updateAccessibilityLevel: value => dispatch(updateAccessibilityLevel(value))
  };
}

class UserInput extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    updateTextColor: PropTypes.func.isRequired,
    correctTextColor: PropTypes.func.isRequired,
    fontSize: PropTypes.object.isRequired,
    updateFontSize: PropTypes.func.isRequired,
    correctFontSize: PropTypes.func.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    toggleFontWeight: PropTypes.func.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    updateBackgroundColor: PropTypes.func.isRequired,
    correctBackgroundColor: PropTypes.func.isRequired,
    accessibilityLevel: PropTypes.string.isRequired,
    updateAccessibilityLevel: PropTypes.func.isRequired
  };

  render() {
    const { textColor, updateTextColor, correctTextColor,
            fontSize, updateFontSize, correctFontSize,
            isFontBold, toggleFontWeight,
            backgroundColor, updateBackgroundColor, correctBackgroundColor,
            accessibilityLevel, updateAccessibilityLevel } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div>
            <span>My text color is </span>
            <span className={styles.colorContainer}>
              <Editable isValid={textColor.isValueValid}
                        value={textColor.value}
                        onChange={updateTextColor}
                        onBlur={correctTextColor} />
            </span>
            <span> at </span>
            <span className={styles.fontSizeContainer}>
              <Editable isValid={fontSize.isValid}
                        value={fontSize.value}
                        onChange={updateFontSize}
                        onBlur={correctFontSize} />
            </span>
            px and
            <span className={styles.fontWeightContainer}>
              <Toggle values={['regular', 'bold']}
                      currentValue={isFontBold ? 'bold' : 'regular'}
                      onChange={toggleFontWeight} />
            </span>
            weight
          </div>
          <div>
            <span>My background color is </span>
            <span className={styles.colorContainer}>
              <Editable isValid={backgroundColor.isValueValid}
                        value={backgroundColor.value}
                        onChange={updateBackgroundColor}
                        onBlur={correctBackgroundColor} />
            </span>
          </div>
          <div>
            My design needs to be
            <span className={styles.accessibilityLevelContainer}>
              <Toggle values={['AA', 'AAA']}
                      currentValue={accessibilityLevel}
                      onChange={updateAccessibilityLevel} />
            </span>
            compliant
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
