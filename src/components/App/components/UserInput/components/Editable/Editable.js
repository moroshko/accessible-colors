import styles from './Editable.less';

import React, { Component, PropTypes } from 'react';

export default class Editable extends Component {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    inputProps: {}
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
    const { isValid, onChange, inputProps } = this.props;

    return (
      <input {...inputProps}
             className={isValid ? styles.validInput : styles.invalidInput}
             aria-invalid={!isValid}
             onFocus={this.onFocus} onKeyUp={this.onKeyUp}
             onChange={event => onChange(event.target.value)}
             ref="input" />
    );
  }
}
