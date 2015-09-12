import styles from './Editable.less';

import React, { Component, PropTypes } from 'react';

export default class Editable extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    isValid: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  static defaultProps = {
    min: null,
    max: null
  };

  constructor(props) {
    super(props);

    this.valueBeforeEdit = null;

    this.onFocus = ::this.onFocus;
    this.onKeyUp = ::this.onKeyUp;
  }

  onFocus(event) {
    this.valueBeforeEdit = event.target.value;
    setTimeout(() => this.refs.input.select());
  }

  onKeyUp(event) {
    const { onChange } = this.props;
    const input = event.target;

    switch (event.which) {
      case 13: // enter
        input.blur();
        break;

      case 27: // esc
        input.blur();
        onChange(this.valueBeforeEdit);
        break;
    }
  }

  render() {
    const { isValid, value, type, min, max, onChange, onBlur } = this.props;

    return (
      <input className={styles.input + ' ' + (isValid ? '' : styles.invalid)}
             type={type} min={min} max={max}
             aria-invalid={!isValid} value={value}
             onFocus={this.onFocus} onKeyUp={this.onKeyUp}
             onChange={event => onChange(event.target.value)}
             onBlur={onBlur}
             ref="input" />
    );
  }
}
