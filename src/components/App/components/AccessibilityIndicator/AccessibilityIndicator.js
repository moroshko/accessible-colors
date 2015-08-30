import styles from './AccessibilityIndicator.less';

import React, { Component, PropTypes } from 'react';

export default class AccessibilityIndicator extends Component {
  static propTypes = {
    accessibilityLevel: PropTypes.string.isRequired,
    isAccessible: PropTypes.bool.isRequired
  };

  render() {
    const { accessibilityLevel, isAccessible } = this.props;

    return (
      <div className={isAccessible ? styles.passedContainer : styles.failedContainer}>
        <div className={styles.innerContainer}>
          <div className={isAccessible ? styles.passedTextContainer : styles.failedTextContainer}>
            {accessibilityLevel} {isAccessible ? 'passed' : 'failed'}
          </div>
        </div>
      </div>
    );
  }
}
