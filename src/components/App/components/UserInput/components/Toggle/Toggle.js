import styles from './Toggle.less';

import React, { PropTypes } from 'react';

function Toggle(props) {
  const { values, currentValue, onChange } = props;
  const otherValue = (currentValue === values[0] ? values[1] : values[0]);

  return (
    <button className={styles.button} type="button"
            onClick={() => onChange(otherValue)}>
      {currentValue}
    </button>
  );
}

Toggle.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Toggle;
