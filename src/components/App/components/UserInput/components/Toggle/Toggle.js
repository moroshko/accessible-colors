import styles from './Toggle.less';

import React, { PropTypes, Component } from 'react';

export default class Toggle extends Component {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onClick = () => {
    const { values, currentValue, onChange } = this.props;
    const otherValue = (currentValue === values[0] ? values[1] : values[0]);

    onChange(otherValue);
  };

  render() {
    const { currentValue } = this.props;

    return (
      <button
        className={styles.button}
        type="button"
        onClick={this.onClick}
      >
        {currentValue}
      </button>
    );
  }
}
