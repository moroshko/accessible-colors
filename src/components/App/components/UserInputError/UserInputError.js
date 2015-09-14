import styles from './UserInputError.less';

import React, { Component, PropTypes } from 'react';
import { MIN_FONT_SIZE } from 'constants';

export default class UserInputError extends Component {
  static propTypes = {
    areColorsValid: PropTypes.bool.isRequired,
    isFontSizeValid: PropTypes.bool.isRequired
  };

  render() {
    const { areColorsValid, isFontSizeValid } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {
            !areColorsValid &&
              <p className={styles.colorError}>
                Enter a valid hexadecimal color
              </p>
          }
          {
            !isFontSizeValid &&
              <p className={styles.fontSizeError}>
                Enter a font size of {MIN_FONT_SIZE}px or above
              </p>
          }
        </div>
      </div>
    );
  }
}
