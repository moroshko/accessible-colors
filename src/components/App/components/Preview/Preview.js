import styles from './Preview.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { str2sixDigitHex, contrast, findClosestAccessibleColor } from 'utils/color/color';
import MultilineEllipsis from 'MultilineEllipsis/MultilineEllipsis';
import { fontSizeInPx } from 'utils/accessibility/accessibility';

const loremIpsum = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

function calcContrast(color1, color2) {
  return Math.round(100 * contrast(color1, color2)) / 100;
}

function calcLinesToShow(fontSize) {
  if (fontSize <= 8) {
    return 7;
  }

  if (fontSize <= 10) {
    return 6;
  }

  if (fontSize <= 12) {
    return 5;
  }

  if (fontSize <= 16) {
    return 4;
  }

  if (fontSize <= 21) {
    return 3;
  }

  if (fontSize <= 36) {
    return 2;
  }

  return 1;
}

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    fontSizeUnit: state.fontSizeUnit,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor
  };
}

function Preview(props) {
  const { textColor, fontSize, fontSizeUnit, isFontBold, backgroundColor,
          accessibilityLevel, accessibleContrast, isAccessible } = props;
  const previewContentStyle = {
    fontSize: fontSizeInPx(parseInt(fontSize.value, 10),fontSizeUnit),
    fontWeight: isFontBold ? '500' : '300'
  };
  const originalTextColor = str2sixDigitHex(textColor.value);
  const originalBackgroundColor = str2sixDigitHex(backgroundColor.value);
  const originalStyle = {
    color: originalTextColor,
    backgroundColor: originalBackgroundColor,
    ...previewContentStyle
  };
  const newBackgroundColor =
    findClosestAccessibleColor(backgroundColor.value, textColor.value, accessibleContrast);
  const newTextColor =
    findClosestAccessibleColor(textColor.value, backgroundColor.value, accessibleContrast);
  const newBackgroundStyle = {
    color: originalTextColor,
    backgroundColor: newBackgroundColor,
    ...previewContentStyle
  };
  const newTextStyle = {
    color: newTextColor,
    backgroundColor: originalBackgroundColor,
    ...previewContentStyle
  };
  const linesToShow = calcLinesToShow(previewContentStyle.fontSize);
  const multilineEllipsis = (
    <MultilineEllipsis
      text={loremIpsum}
      fontSize={previewContentStyle.fontSize}
      linesToShow={linesToShow}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.previewContainer}>
          <div className={isAccessible ? styles.passesPreviewInfo : styles.failsPreviewInfo}>
            <p className={styles.previewInfoTitle}>
              {isAccessible ? 'Passes' : 'Fails'} {accessibilityLevel}
            </p>
            <p className={styles.requiredContrastRatio}>
              Required contrast ratio: {accessibleContrast}
            </p>
            <p className={styles.previewContrastRatio}>
              Your contrast ratio: {calcContrast(originalStyle.color, originalStyle.backgroundColor)}
            </p>
            <div className={isAccessible ? styles.passesTriangle : styles.failsTriangle} />
          </div>
          <div className={styles.previewLoremIpsum} style={originalStyle}>
            {multilineEllipsis}
          </div>
        </div>
        {
          !isAccessible &&
            <div className={styles.previewContainer}>
              {
                newBackgroundColor &&
                  <div className={styles.passesPreviewInfo}>
                    <p className={styles.previewInfoTitle}>
                      Passes {accessibilityLevel}
                    </p>
                    <p className={styles.ifYouChange}>
                      if you change background color to {newBackgroundStyle.backgroundColor.toUpperCase()}
                    </p>
                    <p className={styles.previewContrastRatio}>
                      New contrast ratio: {calcContrast(newBackgroundStyle.color, newBackgroundStyle.backgroundColor)}
                    </p>
                    {
                      newTextColor &&
                        <div className={styles.orConnector}>
                          or
                        </div>
                    }
                    <div className={styles.passesTriangle} />
                  </div>
              }
              {
                newBackgroundColor &&
                  <div className={styles.previewLoremIpsum} style={newBackgroundStyle}>
                    {multilineEllipsis}
                  </div>
              }
              {
                !newBackgroundColor &&
                  <div className={styles.notFound}>
                    No accessible combination found by changing background lightness
                  </div>
              }
            </div>
        }
        {
          !isAccessible &&
            <div className={styles.previewContainer}>
              {
                newTextColor &&
                  <div className={styles.passesPreviewInfo}>
                    <p className={styles.previewInfoTitle}>
                      Passes {accessibilityLevel}
                    </p>
                    <p className={styles.ifYouChange}>
                      if you change text color to {newTextStyle.color.toUpperCase()}
                    </p>
                    <p className={styles.previewContrastRatio}>
                      New contrast ratio: {calcContrast(newTextStyle.color, newTextStyle.backgroundColor)}
                    </p>
                    <div className={styles.passesTriangle} />
                  </div>
              }
              {
                newTextColor &&
                  <div className={styles.previewLoremIpsum} style={newTextStyle}>
                    {multilineEllipsis}
                  </div>
              }
              {
                !newTextColor &&
                  <div className={styles.notFound}>
                    No accessible combination found by changing text lightness
                  </div>
              }
            </div>
        }
      </div>
    </div>
  );
}

Preview.propTypes = {
  textColor: PropTypes.object.isRequired,
  fontSize: PropTypes.object.isRequired,
  fontSizeUnit: PropTypes.string.isRequired,
  isFontBold: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.object.isRequired,
  accessibilityLevel: PropTypes.string.isRequired,
  accessibleContrast: PropTypes.number.isRequired,
  isAccessible: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Preview);
