import styles from './UserInput.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateTextColor, updateFontSize, toggleIsFontBold,
         updateBackgroundColor, updateAccessibilityLevel } from 'flux/actionCreators/app';
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
    updateFontSize: value => dispatch(updateFontSize(value)),
    toggleIsFontBold: () => dispatch(toggleIsFontBold()),
    updateBackgroundColor: value => dispatch(updateBackgroundColor('value', value)),
    updateAccessibilityLevel: value => dispatch(updateAccessibilityLevel(value))
  };
}

class UserInput extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    updateTextColor: PropTypes.func.isRequired,
    fontSize: PropTypes.object.isRequired,
    updateFontSize: PropTypes.func.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    toggleIsFontBold: PropTypes.func.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    updateBackgroundColor: PropTypes.func.isRequired,
    accessibilityLevel: PropTypes.string.isRequired,
    updateAccessibilityLevel: PropTypes.func.isRequired
  };

  render() {
    const { textColor, updateTextColor,
            fontSize, updateFontSize,
            isFontBold, toggleIsFontBold,
            backgroundColor, updateBackgroundColor,
            accessibilityLevel, updateAccessibilityLevel } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div>
            <span>My text color is </span>
            <span className={styles.colorContainer}>
              <Editable isValid={textColor.isValueValid}
                        value={textColor.value}
                        onChange={updateTextColor} />
            </span>
            <span> at </span>
            <span className={styles.fontSizeContainer}>
              <Editable isValid={fontSize.isValid}
                        value={fontSize.value}
                        onChange={updateFontSize} />
            </span>
            px and
            <span className={styles.fontWeightContainer}>
              <Toggle values={['regular', 'bold']}
                      currentValue={isFontBold ? 'bold' : 'regular'}
                      onChange={toggleIsFontBold} />
            </span>
            weight
          </div>
          <div>
            <span>My background color is </span>
            <span className={styles.colorContainer}>
              <Editable isValid={backgroundColor.isValueValid}
                        value={backgroundColor.value}
                        onChange={updateBackgroundColor} />
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
