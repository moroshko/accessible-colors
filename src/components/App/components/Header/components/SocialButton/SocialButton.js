import styles from './SocialButton.less';

import React, { Component, PropTypes } from 'react';
import { REPO } from 'constants';

export default class SocialButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired
  };

  render() {
    const { icon, count } = this.props;

    return (
      <a className={styles.container} target="_blank"
         href={`https://github.com/${REPO}`}>
        <span className={styles.icon + ' ' + icon} />
        <span className={styles.count}>{count}</span>
      </a>
    );
  }
}
