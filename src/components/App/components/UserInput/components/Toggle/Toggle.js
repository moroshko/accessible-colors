import styles from './Toggle.less';

import React, { Component, PropTypes } from 'react';

export default class Toggle extends Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { values, currentValue, onChange } = this.props;
    const otherValue = (currentValue === values[0] ? values[1] : values[0]);

    return (
      <button className={styles.button} type="button"
              onClick={() => onChange(otherValue)}>
        {currentValue}
      </button>
    );
  }
}
