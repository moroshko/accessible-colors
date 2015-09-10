import styles from './MultilineEllipsis.less';

import React, { Component, PropTypes } from 'react';

export default class MultilineEllipsis extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    linesToShow: PropTypes.number.isRequired
  };

  render() {
    const { text, fontSize, linesToShow } = this.props;
    const lineHeight = 1.5;
    const containerStyle = {
      fontSize,
      lineHeight,
      height: fontSize * lineHeight * linesToShow, /* Fallback for non-webkit */
      WebkitLineClamp: linesToShow
    };

    return (
      <div className={styles.container} style={containerStyle}>
        {text}
      </div>
    );
  }
}
