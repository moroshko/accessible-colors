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
    isAccessible: PropTypes.bool.isRequired
  };

  render() {
    const { isInputChanged, isAccessible } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <span className={styles.icon + (isAccessible ? ' icon-circle-tick' : ' icon-circle-cross')} />
          {isInputChanged ? 'Your text' : 'Text'} &amp; background combination
          is {!isAccessible && 'not'} accessible
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AccessibilityIndicator);
