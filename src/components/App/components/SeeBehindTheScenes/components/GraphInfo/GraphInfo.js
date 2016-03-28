import styles from './GraphInfo.less';

import React, { PropTypes } from 'react';

export default function GraphInfo(props) {
  const { contrast } = props;

  return (
    <div className={styles.container}>
      <div>
        <div>
          Contrast
        </div>
        <div className={styles.contrastValue}>
          {contrast.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

GraphInfo.propTypes = {
  contrast: PropTypes.number.isRequired
};
