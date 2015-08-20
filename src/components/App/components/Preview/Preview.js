import styles from './Preview.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'flux/constants/config';
import { str2sixDigitHex, contrast, findClosestAccessibleColor } from 'utils/color/color';

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
    accessibleContrast: PropTypes.number.isRequired,
    isAccessible: PropTypes.bool.isRequired
  };

  contrast(color1, color2) {
    return Math.round(1000 * contrast(color1, color2)) / 1000;
  }

  render() {
    const { textColor, fontSize, isFontBold, backgroundColor,
            isInputChanged, accessibleContrast, isAccessible } = this.props;
    const containerStyle = {
      fontSize: Math.min(parseInt(fontSize.value, 10), MAX_FONT_SIZE),
      fontWeight: isFontBold ? 'bold' : 'normal'
    };
    const originalTextColor = str2sixDigitHex(textColor.value);
    const originalBackgroundColor = str2sixDigitHex(backgroundColor.value);
    const originalStyle = {
      color: originalTextColor,
      backgroundColor: originalBackgroundColor
    };
    const newBackgroundColor =
      findClosestAccessibleColor(backgroundColor.value, textColor.value, accessibleContrast);
    const newTextColor =
      findClosestAccessibleColor(textColor.value, backgroundColor.value, accessibleContrast);
    const newBackgroundStyle = {
      color: originalTextColor,
      backgroundColor: newBackgroundColor
    };
    const newTextStyle = {
      color: newTextColor,
      backgroundColor: originalBackgroundColor
    };

    return (
      <div className={styles.container} style={containerStyle}>
        <div className={styles.innerContainer}>
          <div className={styles.previewContainer}>
            <h2 className={styles.previewTitle}>
              {isInputChanged ? 'Your' : 'Initial'} design
            </h2>
            <div className={styles.previewContent} style={originalStyle}>
              <p className={styles.previewParagraph}>
                {originalStyle.color} text
              </p>
              <p className={styles.previewParagraph + ' ' + styles.previewBackground}>
                {originalStyle.backgroundColor} background
              </p>
              <p className={styles.previewParagraph}>
                Contrast ratio: {this.contrast(originalStyle.color, originalStyle.backgroundColor)}
              </p>
            </div>
          </div>
          {
            !isAccessible &&
              <div className={styles.previewContainer}>
                <h2 className={styles.previewTitle}>
                  New background
                </h2>
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
                    </div>
                }
                { !newBackgroundColor &&
                    <div className={styles.previewContent}>
                      No accessible combination found by changing background lightness.
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
                    </div>
                }
                {
                  !newTextColor &&
                    <div className={styles.previewContent}>
                      No accessible combination found by changing text lightness.
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
