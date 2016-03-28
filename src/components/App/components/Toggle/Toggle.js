import styles from './Toggle.less';

import React, { PropTypes } from 'react';

function Toggle(props) {
  const { values, currentValue, onChange } = props;
  const currentIndex = values.findIndex(value => value === currentValue);

  if (currentIndex === -1) {
    throw new Error(`Toggle: Could not find ${currentValue} in [${values}]`);
    return null;
  }

  const nextIndex = currentIndex === values.length - 1 ? 0 : currentIndex + 1;
  const nextValue = values[nextIndex];

  return (
    <button className={styles.button} type="button"
            onClick={() => onChange(nextValue)}>
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
