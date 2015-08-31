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
    backgroundColor: state.backgroundColor,
    isInputChanged: state.isInputChanged
  };
}

class Preview extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    fontSize: PropTypes.object.isRequired,
    isFontBold: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    isInputChanged: PropTypes.bool.isRequired,

    accessibilityLevel: PropTypes.string.isRequired,
    accessibleContrast: PropTypes.number.isRequired,
    isAccessible: PropTypes.bool.isRequired
  };

  contrast(color1, color2) {
    return Math.round(1000 * contrast(color1, color2)) / 1000;
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
    const { textColor, fontSize, isFontBold, backgroundColor, isInputChanged,
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
            <h2 className={styles.previewTitle}>
              {isInputChanged ? 'Your' : 'Initial'} design
            </h2>
            <p className={styles.lightnessChangedContainer + ' ' + styles.previewHiddenParagraph}
               aria-hidden="true">
            </p>
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
              <p className={styles.previewParagraph}>
                <span className={styles.icon + (isAccessible ? ' icon-tick' : ' icon-cross')} />
                {accessibilityLevel}
              </p>
            </div>
          </div>
          {
            !isAccessible &&
              <div className={styles.previewContainer}>
                <h2 className={styles.previewTitle}>
                  New background
                </h2>
                <p className={styles.lightnessChangedContainer}>
                  {
                    newBackgroundColor &&
                      <span>
                        Lightness changed: {backgroundColorChange.from} to {backgroundColorChange.to}
                      </span>
                  }
                </p>
                {
                  newBackgroundColor &&
                    <div className={styles.previewContent} style={newBackgroundStyle}>
                      <p className={styles.previewParagraph + ' ' + styles.previewHiddenParagraph}
                         aria-hidden="true">
                        {originalStyle.color} text
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
                <h2 className={styles.previewTitle}>
                  New text color
                </h2>
                <p className={styles.lightnessChangedContainer}>
                  {
                    newTextColor &&
                      <span>
                        Lightness changed: {textColorChange.from} to {textColorChange.to}
                      </span>
                  }
                </p>
                {
                  newTextColor &&
                    <div className={styles.previewContent} style={newTextStyle}>
                      <p className={styles.previewParagraph}>
                        {newTextStyle.color.toUpperCase()} text
                      </p>
                      <p className={styles.previewParagraph + ' ' + styles.previewHiddenParagraph + ' ' + styles.previewBackground}
                         aria-hidden="true">
                        {originalStyle.backgroundColor} background
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
