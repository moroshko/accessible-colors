import styles from './GraphInfo.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'constants';
import { str2sixDigitHex, str2hsl } from 'utils/color/color';
import MultilineEllipsis from 'MultilineEllipsis/MultilineEllipsis';

const loremIpsum = `
  Lorem ipsum dolor sit amet, ut pri essent facilis constituto, etiam assueverit
  signiferumque ex ius. Quas quaestio ea duo. Purto magna aperiam no pri. Pri
  prompta partiendo efficiendi ne, sed tritani deterruisset necessitatibus id,
  ad est sint noluisse.
`;

function calcLinesToShow(fontSize) {
  if (fontSize <= 12) {
    return 5;
  }

  if (fontSize <= 16) {
    return 4;
  }

  return 3;
}

function mapStateToProps(state) {
  return {
    fontSize: state.fontSize,
    isFontBold: state.isFontBold
  };
}

function GraphInfo(props) {
  const { fontSize, isFontBold, contrast, textColorValue, backgroundColorValue } = props;
  const colorStr = str2sixDigitHex(textColorValue);
  const backgroundColorStr = str2sixDigitHex(backgroundColorValue);
  const colorHsl = str2hsl(colorStr);
  const backgroundColorHsl = str2hsl(backgroundColorStr);
  const sampleStyle = {
    fontSize: Math.min(parseInt(fontSize.value, 10), MAX_FONT_SIZE),
    fontWeight: isFontBold ? '500' : '300',
    color: colorStr,
    backgroundColor: backgroundColorStr
  };
  const linesToShow = calcLinesToShow(sampleStyle.fontSize);
  const multilineEllipsis = (
    <MultilineEllipsis text={loremIpsum}
                       fontSize={sampleStyle.fontSize}
                       linesToShow={linesToShow} />
  );

  return (
    <div className={styles.container}>
      <div className={styles.contrastContainer}>
        <div className={styles.title}>
          Contrast
        </div>
        <div className={styles.contrastContent}>
          {contrast.toFixed(2)}
        </div>
      </div>
      <div className={styles.sampleContainer}>
        <div className={styles.title}>
          Sample
        </div>
        <div className={styles.sampleContent} style={sampleStyle}>
          {multilineEllipsis}
        </div>
      </div>
      <div className={styles.colorsContainer}>
        <div className={styles.title}>
          Text color
        </div>
        <div className={styles.textColorContent}>
          {colorStr.toUpperCase()}
          <div className={styles.hslContainer}>
            <span>H: {colorHsl.h.toFixed(2)}</span>
            <span>S: {colorHsl.s.toFixed(2)}</span>
            <span>L: {colorHsl.l.toFixed(2)}</span>
          </div>
        </div>
        <div className={styles.backgroundColorTitle}>
          Background color
        </div>
        <div className={styles.backgroundColorContent}>
          {backgroundColorStr.toUpperCase()}
          <div className={styles.hslContainer}>
            <span>H: {backgroundColorHsl.h.toFixed(2)}</span>
            <span>S: {backgroundColorHsl.s.toFixed(2)}</span>
            <span>L: {backgroundColorHsl.l.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

GraphInfo.propTypes = {
  fontSize: PropTypes.object.isRequired,
  isFontBold: PropTypes.bool.isRequired,

  contrast: PropTypes.number.isRequired,
  textColorValue: PropTypes.string.isRequired,
  backgroundColorValue: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GraphInfo);
