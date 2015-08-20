import styles from './Graph.less';

import React, { Component, PropTypes } from 'react';
import { str2sixDigitHex, hsl2str, contrast } from 'utils/color/color';

export default class Color extends Component {
  static propTypes = {
    isBackgroundColor: PropTypes.bool.isRequired,
    colorChannel: PropTypes.string.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    textColor: PropTypes.object.isRequired,
    accessibleContrast: PropTypes.number.isRequired
  };

  replaceChannel(color, colorChannel, colorChannelValue) {
    const newColor = { ...color };

    newColor[colorChannel] = colorChannelValue;

    return hsl2str({
      h: newColor.hue,
      s: newColor.saturation,
      l: newColor.lightness
    });
  }

  render() {
    const { isBackgroundColor, colorChannel, backgroundColor, textColor,
            accessibleContrast } = this.props;
    const yAxisName = (isBackgroundColor ? 'Background' : 'Text') +
                      ' color ' + colorChannel;
    const yMaxValue = (colorChannel === 'hue' ? 360 : 100);
    const color = (isBackgroundColor ? backgroundColor: textColor);
    const otherColor = (isBackgroundColor ? textColor: backgroundColor);
    const yValue = parseFloat(color[colorChannel]);

    let data = [];

    for (let y = 0; y <= yMaxValue; y++) {
      data.push({
        x: contrast(this.replaceChannel(color, colorChannel, y), otherColor.value),
        y
      });
    }

    return (
      <div className={styles.container}>
        <div className={styles.coordinates}>
          <div className={styles.notAccessibleArea}
               style={{ width: 5 * (accessibleContrast - 1) + '%' }} />
          <div className={styles.accessibleArea}
               style={{ left: 5 * (accessibleContrast - 1) + '%',
                        width: (100 - 5 * (accessibleContrast - 1)) + '%' }} />
          <div className={styles.xAxis} />
          <div className={styles.xAxisArrow} />
          <div className={styles.xAxisName}>Contrast</div>
          <div className={styles.xAxisMinValue}>1</div>
          <div className={styles.xAxisAccessibleContrast}
               style={{ left: 5 * (accessibleContrast - 1) - 1 + '%' }}>{accessibleContrast}</div>
          <div className={styles.xAxisMaxValue}>21</div>
          <div className={styles.yAxis} />
          <div className={styles.yAxisArrow} />
          <div className={styles.yAxisName}>{yAxisName}</div>
          <div className={styles.yAxisMinValue}>0</div>
          <div className={styles.yAxisMaxValue}>{yMaxValue}</div>
          <div className={styles.currentValue}
               style={{ top: 100 * (1 - yValue / yMaxValue) + '%',
                        backgroundColor: str2sixDigitHex(color.value) }} />
          {
            data.map(({ x, y }) =>
              <div className={styles.dataPoint}
                   style={{ left: 5 * (x - 1) + '%',
                            top: 100 * (1 - y / yMaxValue) + '%' }}
                   key={x + ' ' + y} />
            )
          }
        </div>
      </div>
    );
  }
}
