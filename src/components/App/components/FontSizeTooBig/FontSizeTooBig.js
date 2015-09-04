import styles from './FontSizeTooBig.less';

import React, { Component } from 'react';
import { MAX_FONT_SIZE } from 'constants';

export default class FontSizeTooBig extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.innerContainer}>
          The preview shows up to {MAX_FONT_SIZE}pt font size.<br />
          Above 18pt, font size does not affect accessibility.
        </p>
      </div>
    );
  }
}
