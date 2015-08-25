import styles from './FontSizeTooBig.less';

import React, { Component } from 'react';
import { MAX_FONT_SIZE } from 'constants';

export default class FontSizeTooBig extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.innerContainer}>
          The preview shows up to {MAX_FONT_SIZE}px font size.<br />
          Above 18px, font size does not affect accessibility.
        </p>
      </div>
    );
  }
}
