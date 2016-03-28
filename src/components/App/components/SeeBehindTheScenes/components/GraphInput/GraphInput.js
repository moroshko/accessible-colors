import styles from './GraphInput.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateGraphColorType, updateGraphColorParameter } from 'actions/app';
import Toggle from 'Toggle/Toggle';

function mapStateToProps(state) {
  return {
    colorType: state.graph.colorType,
    colorParameter: state.graph.colorParameter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGraphColorType: value => dispatch(updateGraphColorType(value)),
    updateGraphColorParameter: value => dispatch(updateGraphColorParameter(value))
  };
}

function GraphInput(props) {
  const { colorType, colorParameter,
          updateGraphColorType, updateGraphColorParameter } = props;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        What happens to the contrast as I change
        <Toggle values={['text', 'background']}
                currentValue={colorType === 'textColor' ? 'text' : 'background'}
                onChange={updateGraphColorType} />
        color's
        <Toggle values={['hue', 'saturation', 'lightness']}
                currentValue={colorParameter}
                onChange={updateGraphColorParameter} />
        ?
      </div>
    </div>
  );
}

GraphInput.propTypes = {
  colorType: PropTypes.string.isRequired,
  colorParameter: PropTypes.string.isRequired,

  updateGraphColorType: PropTypes.func.isRequired,
  updateGraphColorParameter: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphInput);
