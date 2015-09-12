import styles from './ComingSoon.less';

import React, { Component } from 'react';

export default class ComingSoon extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h3 className={styles.title}>
            Coming soon...
          </h3>
          <div className={styles.content}>
            <p>
              We are currently working on a feature to help you visually explore
              how color contrast is affected by changes in color hue, saturation
              and lightness.
            </p>
            <p>
              To find out more, or if you have any feedback, get in touch with
              us on&nbsp;
              <a className={styles.link} target="_blank"
                 href="https://accessible-colors.herokuapp.com">
                Slack
              </a>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
