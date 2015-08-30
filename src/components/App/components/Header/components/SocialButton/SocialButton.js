import styles from './SocialButton.less';

import React, { Component, PropTypes } from 'react';

export default class SocialButton extends Component {
  static propTypes = {
    isMinified: PropTypes.bool.isRequired,
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    openInNewTab: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    openInNewTab: false
  };

  setColor(color) {
    this.refs.link.style.color = color;
  }

  render() {
    const { isMinified, className, icon, count, color, hoverColor,
            href, openInNewTab } = this.props;

    return (
      <a className={className + ' ' + (isMinified ? styles.minifiedContainer : styles.fullContainer)}
         target={openInNewTab ? '_blank' : '_self'}
         href={href}
         style={{ color }}
         onMouseEnter={() => this.setColor(hoverColor)}
         onMouseLeave={() => this.setColor(color)}
         ref="link">
        <span className={(isMinified ? styles.minifiedIcon : styles.fullIcon) + ' ' + icon} />
        <span className={isMinified ? styles.minifiedCount : styles.fullCount}>{count}</span>
      </a>
    );
  }
}
