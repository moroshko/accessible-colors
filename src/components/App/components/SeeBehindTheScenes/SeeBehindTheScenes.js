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

function getGraphData(textColor, backgroundColor, graph) {
  const { colorType, colorParameter } = graph;
  const max = (colorParameter === 'hue' ? 360 : 100);
  const isTextColor = (colorType === 'textColor');
  const constantColorValue = (isTextColor ? backgroundColor.value : textColor.value);
  const modifiedColor = {
    h: isTextColor ? textColor.hue : backgroundColor.hue,
    s: isTextColor ? textColor.saturation : backgroundColor.saturation,
    l: isTextColor ? textColor.lightness : backgroundColor.lightness
  };
  const result = [];

  for (let x = 0; x <= max; x++) {
    const y = contrast(constantColorValue, hsl2str({
      ...modifiedColor,
      [colorParameter[0]]: x
    }));

    result.push({ x, y });
  }

  return result;
}

const eventHandlers = {
  draw: data => {
    if (data.type === 'grid' && data.index > 0) {
      data.element.remove();
    }
  }
};

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
  const xAxisTitle = `${colorType === 'textColor' ? 'Text' : 'Background'} color ${colorParameter}`;
  const currentXvalue = round(props[colorType][colorParameter], 2);
  const graphData = getGraphData(textColor, backgroundColor, graph);
  const maxXvalue = graphData[graphData.length - 1].x;

  const options = {
    fullWidth: true,
    chartPadding: {
      top: 20,
      right: 30,
      bottom: 40,
      left: 40
    },
    axisX: {
      type: Chartist.FixedScaleAxis,
      low: 0,
      high: maxXvalue,
      ticks: [0, currentXvalue, maxXvalue]
    },
    axisY: {
      type: Chartist.FixedScaleAxis,
      low: 1,
      high: 21,
      ticks: [1, accessibleContrast, 21]
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
      accessibleLine: {
        showPoint: false
      },
      graph: {
        showPoint: false
      }
    }
  };

  const data = {
    series: [
      {
        name: 'accessibleLine',
        data: [
          { x: 0, y: accessibleContrast },
          { x: maxXvalue, y: accessibleContrast }
        ]
      },
      {
        name: 'graph',
        data: graphData
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
          <ChartistGraph className="ct-perfect-fifth"
                         type="Line"
                         options={options}
                         data={data}
                         eventHandlers={eventHandlers} />
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
