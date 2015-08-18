import styles from './UserInputError.less';

import React, { Component } from 'react';

export default class UserInputError extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          Please fix the errors above
        </div>
      </div>
    );
  }
}
