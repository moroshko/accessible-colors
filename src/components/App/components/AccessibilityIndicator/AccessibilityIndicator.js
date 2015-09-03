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
      <div className={isAccessible ? styles.passesContainer : styles.failsContainer}>
        <div className={styles.innerContainer}>
          <div className={isAccessible ? styles.passesTextContainer : styles.failsTextContainer}>
            {isAccessible ? 'Passes' : 'Fails'} {accessibilityLevel}
          </div>
          <div className={isAccessible ? styles.passesTriangle : styles.failsTriangle} />
        </div>
      </div>
    );
  }
}
