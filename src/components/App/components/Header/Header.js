import styles from './Header.less';

import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>
            ACCESSIBLE COLORS
          </h1>
          <p className={styles.subHeader}>
            Make any color combination accessible
          </p>
        </div>
      </div>
    );
  }
}
