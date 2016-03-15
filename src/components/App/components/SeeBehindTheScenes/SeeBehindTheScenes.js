import styles from './SeeBehindTheScenes.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import round from 'lodash.round';
import { contrast, hsl2str } from 'utils/color/color';
import Chartist from 'chartist';
import ChartistGraph from 'ChartistGraph/ChartistGraph';

// chartist-plugin-axistitle requires Chartist to be on `window`
window.Chartist = Chartist;
require('chartist-plugin-axistitle');

const eventHandlers = {
  draw: data => {
    const { type } = data;

    if (type === 'label') {
      const { index, axis: { units: { dir: direction } } } = data;

      if (direction === 'vertical') {
        data.element.attr({
          style: 'transform: translateY(5px)'
        });
      }

      if (direction === 'horizontal') {
        data.element.attr({
          style: `transform: translateX(${[-3, -14, -9][index]}px)`
        });
      }
    }
  }
};

function getContrast(constantColorValue, modifiedColor, colorParameter, colorParameterValue) {
  return contrast(constantColorValue, hsl2str({
    ...modifiedColor,
    [colorParameter[0]]: colorParameterValue
  }));
}

function getGraphData(constantColorValue, modifiedColor, colorParameter) {
  const max = (colorParameter === 'hue' ? 360 : 100);
  const result = [];

  for (let x = 0; x <= max; x += 2) {
    result.push({
      x,
      y: getContrast(constantColorValue, modifiedColor, colorParameter, x)
    });
  }

  return result;
}

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    backgroundColor: state.backgroundColor,
    graph: state.graph
  };
}

function SeeBehindTheScenes(props) {
  const { textColor, backgroundColor, graph, accessibleContrast } = props;
  const { colorType, colorParameter } = graph;
  const isTextColor = (colorType === 'textColor');
  const constantColorValue = (isTextColor ? backgroundColor.value : textColor.value);
  const modifiedColor = {
    h: isTextColor ? textColor.hue : backgroundColor.hue,
    s: isTextColor ? textColor.saturation : backgroundColor.saturation,
    l: isTextColor ? textColor.lightness : backgroundColor.lightness
  };
  const xAxisTitle = `${isTextColor ? 'Text' : 'Background'} color ${colorParameter}`;
  const currentXvalue = props[colorType][colorParameter];
  const currentYvalue = getContrast(constantColorValue, modifiedColor, colorParameter, currentXvalue);
  const graphData = getGraphData(constantColorValue, modifiedColor, colorParameter);
  const maxXvalue = graphData[graphData.length - 1].x;

  const options = {
    chartPadding: {
      top: 20,
      right: 30,
      bottom: 40,
      left: 40
    },
    axisX: {
      type: Chartist.FixedScaleAxis,
      low: 0,
      high: maxXvalue * 1.1,
      ticks: [0, round(currentXvalue, 2), maxXvalue],
      showGrid: false
    },
    axisY: {
      type: Chartist.FixedScaleAxis,
      low: 1,
      high: 21 * 1.1,
      ticks: [1, accessibleContrast, 21],
      showGrid: false
    },
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: xAxisTitle,
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 50   /* Controls the distance between the X axis title and the graph */
          },
          textAnchor: 'middle'
        },
        axisY: {
          axisTitle: 'Contrast',
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 50   /* Controls the distance between the Y axis title and the graph */
          },
          textAnchor: 'middle',
          flipTitle: true
        }
      })
    ],
    series: {
      axes: {
        showPoint: false
      },
      accessibleLine: {
        showPoint: false
      },
      graph: {
        showPoint: false
      },
      currentPoint: {
        showPoint: true
      }
    }
  };

  const data = {
    series: [
      {
        name: 'axes',
        data: [
          { x: 0, y: 1 },
          { x: maxXvalue * 1.1, y: 1 },
          null,
          { x: 0, y: 1 },
          { x: 0, y: 21 * 1.1 }
        ]
      },
      {
        name: 'accessibleLine',
        data: [
          { x: 0, y: accessibleContrast },
          { x: maxXvalue, y: accessibleContrast }
        ]
      },
      {
        name: 'graph',
        data: graphData,
        lineSmooth: Chartist.Interpolation.none({ fillHoles: true })
      },
      {
        name: 'currentPoint',
        data: [
          { x: currentXvalue, y: currentYvalue }
        ]
      }
    ]
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h3 className={styles.title}>
          See behind the scenes
        </h3>
        <div className={styles.content}>
          <div className={styles.graphContainer}>
            <ChartistGraph className="ct-octave"
                           type="Line"
                           options={options}
                           data={data}
                           eventHandlers={eventHandlers} />
          </div>
        </div>
      </div>
    </div>
  );
}

SeeBehindTheScenes.propTypes = {
  textColor: PropTypes.object.isRequired,
  backgroundColor: PropTypes.object.isRequired,
  graph: PropTypes.object.isRequired,

  accessibleContrast: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(SeeBehindTheScenes);
