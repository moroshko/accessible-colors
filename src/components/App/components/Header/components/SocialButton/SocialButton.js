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

  storeLinkElement = element => {
    if (element !== null) {
      this.link = element;
    }
  };

  onMouseEnter = () => {
    this.link.style.color = this.props.hoverColor;
  };

  onMouseLeave = () => {
    this.link.style.color = this.props.color;
  };

  render() {
    const { linkProps, icon, count, color } = this.props;
    const className = (linkProps.className || '') + ' ' + styles.container;

    return (
      <a
        {...linkProps}
        className={className}
        style={{ color }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={this.storeLinkElement}
      >
        <span className={styles.icon + ' ' + icon} />
        <span className={styles.count}>{count}</span>
      </a>
    );
  }
}
