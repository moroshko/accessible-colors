import styles from './App.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'constants';
import { accessibleContrast } from 'utils/accessibility/accessibility';
import { contrast } from 'utils/color/color';
import Header from 'Header/Header';
import UserInput from 'UserInput/UserInput';
import AccessibilityIndicator from 'AccessibilityIndicator/AccessibilityIndicator';
import FontSizeTooBig from 'FontSizeTooBig/FontSizeTooBig';
import UserInputError from 'UserInputError/UserInputError';
import Preview from 'Preview/Preview';
import Footer from 'Footer/Footer';

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor,
    accessibilityLevel: state.accessibilityLevel
  };
}

class App extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    fontSize: PropTypes.object.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    accessibilityLevel: PropTypes.string.isRequired
  };

  render() {
    const { textColor, fontSize, isFontBold,
            backgroundColor, accessibilityLevel } = this.props;
    const areColorsValid = textColor.isValueValid && backgroundColor.isValueValid;
    const isFontSizeValid = fontSize.isValid;
    const isUserInputValid = areColorsValid && isFontSizeValid;
    const fontSizeValue = parseInt(fontSize.value, 10);
    const accessibleContrastRatio = isUserInputValid ?
      accessibleContrast(accessibilityLevel, fontSizeValue, isFontBold) : null;
    const isAccessible = isUserInputValid ?
      (contrast(textColor.value, backgroundColor.value) >= accessibleContrastRatio) : null;

    return (
      <div className={styles.container}>
        <Header />
        <UserInput />
        {isUserInputValid && <AccessibilityIndicator accessibilityLevel={accessibilityLevel}
                                                     isAccessible={isAccessible} />}
        {isUserInputValid && <Preview accessibilityLevel={accessibilityLevel}
                                      accessibleContrast={accessibleContrastRatio}
                                      isAccessible={isAccessible} />}
        {isUserInputValid && fontSizeValue > MAX_FONT_SIZE && <FontSizeTooBig />}
        {!isUserInputValid && <UserInputError areColorsValid={areColorsValid}
                                              isFontSizeValid={isFontSizeValid} />}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
