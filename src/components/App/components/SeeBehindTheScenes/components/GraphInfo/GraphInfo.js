import styles from './GraphInfo.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { MAX_FONT_SIZE } from 'constants';
import { str2sixDigitHex, str2hsl } from 'utils/color/color';
import MultilineEllipsis from 'MultilineEllipsis/MultilineEllipsis';

const loremIpsum = `
  Lorem ipsum dolor sit amet, et modo impedit sadipscing quo, te has expetendis
  efficiendi assueverit, quas corpora accusamus vim ne. Usu ex platonem mandamus
  theophrastus, duo dictas inimicus an, vim ei recusabo salutatus. Has cu iriure
  fabulas laboramus. Et quidam omittantur voluptatibus per, illum partem mollis
  ea eum, sale possim in vix. Copiosae invenire intellegebat mea te. Has quando
  mollis an. Falli saepe euismod an per, no graeco aperiri sed. Ea per postea
  necessitatibus, his ut odio commodo sententiae. Legere accusata sed an, mollis
  convenire accusamus te pri, aperiam nusquam ocurreret quo cu. Ne semper docendi
  fastidii vis, in has debet torquatos necessitatibus. Solet postea albucius an
  pri, cum ut sint definiebas. Case inimicus id quo, dolore temporibus has ei.
`;

function calcLinesToShow(fontSize) {
  if (fontSize <= 10) {
    return 10;
  }

  if (fontSize <= 12) {
    return 9;
  }

  if (fontSize <= 14) {
    return 8;
  }

  if (fontSize <= 16) {
    return 7;
  }

  if (fontSize <= 18) {
    return 6;
  }

  return 5;
}

function mapStateToProps(state) {
  return {
    fontSize: state.fontSize,
    isFontBold: state.isFontBold,
    accessibilityLevel: state.accessibilityLevel
  };
}

function GraphInfo(props) {
  const { fontSize, isFontBold, accessibilityLevel, contrast, isAccessible,
          textColorValue, backgroundColorValue } = props;
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
        <div className={styles.passesOrFails}>
          {isAccessible ? 'Passes' : 'Fails'} {accessibilityLevel}
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
  accessibilityLevel: PropTypes.string.isRequired,

  contrast: PropTypes.number.isRequired,
  isAccessible: PropTypes.bool.isRequired,
  textColorValue: PropTypes.string.isRequired,
  backgroundColorValue: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GraphInfo);
