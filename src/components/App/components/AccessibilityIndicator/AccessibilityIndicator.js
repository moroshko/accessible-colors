import styles from './AccessibilityIndicator.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isInputChanged: state.isInputChanged
  };
}

class AccessibilityIndicator extends Component {
  static propTypes = {
    isInputChanged: PropTypes.bool.isRequired,

    accessibilityLevel: PropTypes.string.isRequired,
    isAccessible: PropTypes.bool.isRequired
  };

  render() {
    const { accessibilityLevel, isInputChanged, isAccessible } = this.props;

    return (
      <div className={isAccessible ? styles.passedContainer : styles.failedContainer}>
        <div className={styles.innerContainer}>
          <div className={isAccessible ? styles.passedTextContainer : styles.failedTextContainer}>
            <span className={styles.icon + (isAccessible ? ' icon-tick' : ' icon-cross')} />
            {accessibilityLevel} {isAccessible ? 'passed' : 'failed'}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccessibilityIndicator);
