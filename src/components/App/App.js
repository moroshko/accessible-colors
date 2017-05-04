import styles from './App.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { accessibleContrast } from 'utils/accessibility/accessibility';
import { contrast } from 'utils/color/color';
import Header from 'Header/Header';
import UserInput from 'UserInput/UserInput';
import Preview from 'Preview/Preview';
import HowItWorks from 'HowItWorks/HowItWorks';
import ComingSoon from 'ComingSoon/ComingSoon';
import Footer from 'Footer/Footer';

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    fontSizeUnit: state.fontSizeUnit,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor,
    accessibilityLevel: state.accessibilityLevel
  };
}

function App(props) {
  const { textColor, fontSize, fontSizeUnit, isFontBold,
          backgroundColor, accessibilityLevel } = props;
  const isUserInputValid = textColor.isValueValid &&
                           backgroundColor.isValueValid &&
                           fontSize.isValid;
  const fontSizeValue = parseInt(fontSize.value, 10);
  const accessibleContrastRatio = isUserInputValid ?
    accessibleContrast(accessibilityLevel, fontSizeValue, fontSizeUnit, isFontBold) : null;
  const isAccessible = isUserInputValid ?
    (contrast(textColor.value, backgroundColor.value) >= accessibleContrastRatio) : null;

  return (
    <div className={styles.container}>
      <Header />
      <UserInput />
      <div className={styles.previewContainer}>
        {
          isUserInputValid &&
            <Preview
              accessibilityLevel={accessibilityLevel}
              accessibleContrast={accessibleContrastRatio}
              isAccessible={isAccessible}
            />
        }
      </div>
      <HowItWorks />
      <ComingSoon />
      <Footer />
    </div>
  );
}

App.propTypes = {
  textColor: PropTypes.object.isRequired,
  fontSize: PropTypes.object.isRequired,
  fontSizeUnit: PropTypes.string.isRequired,
  isFontBold: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.object.isRequired,
  accessibilityLevel: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(App);
