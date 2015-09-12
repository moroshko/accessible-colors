import styles from './SocialButton.less';

import React, { Component, PropTypes } from 'react';

export default class SocialButton extends Component {
  static propTypes = {
    linkProps: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired
  };

  setColor(color) {
    this.refs.link.style.color = color;
  }

  render() {
    const { linkProps, icon, count, color, hoverColor } = this.props;
    const className = (linkProps.className || '') + ' ' + styles.container;

    return (
      <a {...linkProps}
         className={className}
         style={{ color }}
         onMouseEnter={() => this.setColor(hoverColor)}
         onMouseLeave={() => this.setColor(color)}
         ref="link">
        <span className={styles.icon + ' ' + icon} />
        <span className={styles.count}>{count}</span>
      </a>
    );
  }
}
