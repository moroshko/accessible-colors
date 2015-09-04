import styles from './Preview.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'constants';
import { str2sixDigitHex, str2hsl,
         contrast, findClosestAccessibleColor } from 'utils/color/color';

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

  getLightnessChange(fromColor, toColor) {
    const fromHsl = str2hsl(fromColor);
    const toHsl = str2hsl(toColor);
    const fromL = fromHsl.l;
    const toL = toHsl.l;
    let from = fromL.toFixed();
    let to = toL.toFixed();

    if (from === to) {
      from = fromL.toFixed(1);
      to = toL.toFixed(1);
    }

    return {
      from: from + '%',
      to: to + '%'
    };
  }

  render() {
    const { textColor, fontSize, isFontBold, backgroundColor,
            accessibilityLevel, accessibleContrast,isAccessible } = this.props;
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
    const backgroundColorChange =
      newBackgroundColor ? this.getLightnessChange(originalBackgroundColor, newBackgroundColor) : null;
    const textColorChange =
      newTextColor ? this.getLightnessChange(originalTextColor, newTextColor) : null;

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.previewContainer}>
            <div className={styles.previewHeader} style={originalStyle} />
            <div className={styles.previewContent} style={originalStyle}>
              <p className={styles.previewParagraph}>
                {originalStyle.color.toUpperCase()} text
              </p>
              <p className={styles.previewParagraph + ' ' + styles.previewBackground}>
                {originalStyle.backgroundColor.toUpperCase()} background
              </p>
              <p className={styles.previewParagraph}>
                Contrast ratio: {this.contrast(originalStyle.color, originalStyle.backgroundColor)}
              </p>
              <p className={styles.previewParagraph + ' ' + styles.previewHiddenParagraph}
                 aria-hidden="true">
                AAA
              </p>
            </div>
          </div>
          {
            !isAccessible &&
              <div className={styles.previewContainer}>
                <div className={styles.previewHeader}>
                  <p className={styles.previewTitle}>
                    Fix background
                  </p>
                  <p className={styles.lightnessChange}>
                    {
                      newBackgroundColor &&
                        <span>
                          by changing its lightness<br />
                          from {backgroundColorChange.from} to {backgroundColorChange.to}
                        </span>
                    }
                  </p>
                </div>
                {
                  newBackgroundColor &&
                    <div className={styles.previewContent} style={newBackgroundStyle}>
                      <p className={styles.previewParagraph + ' ' + styles.previewHiddenParagraph}
                         aria-hidden="true">
                        #FFFFFF text
                      </p>
                      <p className={styles.previewParagraph + ' ' + styles.previewBackground}>
                        {newBackgroundStyle.backgroundColor.toUpperCase()} background
                      </p>
                      <p className={styles.previewParagraph}>
                        Contrast ratio: {this.contrast(newBackgroundStyle.color, newBackgroundStyle.backgroundColor)}
                      </p>
                      <p className={styles.previewParagraph}>
                        <span className={styles.icon + ' icon-tick'} />
                        {accessibilityLevel}
                      </p>
                      {
                        newTextColor &&
                          <div className={styles.orConnector}>
                            or
                          </div>
                      }
                    </div>
                }
                { !newBackgroundColor &&
                    <div className={styles.previewContent}>
                      No accessible combination found by changing background lightness
                    </div>
                }
              </div>
          }
          {
            !isAccessible &&
              <div className={styles.previewContainer}>
                <div className={styles.previewHeader}>
                  <p className={styles.previewTitle}>
                    Fix text color
                  </p>
                  <p className={styles.lightnessChange}>
                    {
                      newTextColor &&
                        <span>
                          by changing its lightness<br />
                          from {textColorChange.from} to {textColorChange.to}
                        </span>
                    }
                  </p>
                </div>
                {
                  newTextColor &&
                    <div className={styles.previewContent} style={newTextStyle}>
                      <p className={styles.previewParagraph}>
                        {newTextStyle.color.toUpperCase()} text
                      </p>
                      <p className={styles.previewParagraph + ' ' + styles.previewHiddenParagraph + ' ' + styles.previewBackground}
                         aria-hidden="true">
                        #FFFFFF background
                      </p>
                      <p className={styles.previewParagraph}>
                        Contrast ratio: {this.contrast(newTextStyle.color, newTextStyle.backgroundColor)}
                      </p>
                      <p className={styles.previewParagraph}>
                        <span className={styles.icon + ' icon-tick'} />
                        {accessibilityLevel}
                      </p>
                    </div>
                }
                {
                  !newTextColor &&
                    <div className={styles.previewContent}>
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
