import styles from './MultilineEllipsis.less';

import React, { PropTypes } from 'react';

function MultilineEllipsis(props) {
  const { text, fontSize, linesToShow } = props;
  const lineHeight = 1.5;
  const containerStyle = {
    fontSize,
    lineHeight,
    height: fontSize * lineHeight * linesToShow, /* Fallback for non-webkit */
    WebkitLineClamp: linesToShow
  };

  return (
    <div className={styles.container} style={containerStyle}>
      {text}
    </div>
  );
}

MultilineEllipsis.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  linesToShow: PropTypes.number.isRequired
};

export default MultilineEllipsis;
