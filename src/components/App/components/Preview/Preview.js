import styles from './Preview.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'constants';
import { str2sixDigitHex, contrast, findClosestAccessibleColor } from 'utils/color/color';
import MultilineEllipsis from 'MultilineEllipsis/MultilineEllipsis';

const loremIpsum = `
  Lorem ipsum dolor sit amet, ut pri essent facilis constituto, etiam assueverit
  signiferumque ex ius. Quas quaestio ea duo. Purto magna aperiam no pri. Pri
  prompta partiendo efficiendi ne, sed tritani deterruisset necessitatibus id,
  ad est sint noluisse.
`;

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    isFontBold: state.isFontBold,
    backgroundColor: state.backgroundColor
  };
}

class Preview extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    fontSize: PropTypes.object.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.object.isRequired,

    accessibilityLevel: PropTypes.string.isRequired,
    accessibleContrast: PropTypes.number.isRequired,
    isAccessible: PropTypes.bool.isRequired
  };

  contrast(color1, color2) {
    return Math.round(100 * contrast(color1, color2)) / 100;
  }

  calcLinesToShow(fontSize) {
    if (fontSize <= 12) {
      return 5;
    }

    if (fontSize <= 16) {
      return 4;
    }

    return 3;
  }

  render() {
    const { textColor, fontSize, isFontBold, backgroundColor,
            accessibilityLevel, accessibleContrast, isAccessible } = this.props;
    const previewContentStyle = {
      fontSize: Math.min(parseInt(fontSize.value, 10), MAX_FONT_SIZE),
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
    const linesToShow = this.calcLinesToShow(previewContentStyle.fontSize);
    const multilineEllipsis = (
      <MultilineEllipsis text={loremIpsum}
                         fontSize={previewContentStyle.fontSize}
                         linesToShow={linesToShow} />
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
                Your contrast ratio: {this.contrast(originalStyle.color, originalStyle.backgroundColor)}
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
                        New contrast ratio: {this.contrast(newBackgroundStyle.color, newBackgroundStyle.backgroundColor)}
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
                        New contrast ratio: {this.contrast(newTextStyle.color, newTextStyle.backgroundColor)}
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
}

export default connect(mapStateToProps)(Preview);
