import styles from './SeeBehindTheScenes.less';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { contrast, hsl2str } from 'utils/color/color';
import { updateGraphSliderValue } from 'actions/app';
import Chartist from 'chartist';
import ReactSlider from 'react-slider';
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

function getGraphData(constantColorValue, modifiedColor, colorParameter, maxXvalue) {
  const result = [];

  for (let x = 0; x <= maxXvalue; x += 2) {
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

function mapDispatchToProps(dispatch) {
  return {
    updateGraphSliderValue: value => dispatch(updateGraphSliderValue(value))
  };
}

class SeeBehindTheScenes extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    backgroundColor: PropTypes.object.isRequired,
    graph: PropTypes.object.isRequired,

    updateGraphSliderValue: PropTypes.func.isRequired,

    accessibleContrast: PropTypes.number.isRequired
  };

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    //console.log('New window width:', window.innerWidth);
  }

  onChange(newSliderValue) {
    this.props.updateGraphSliderValue(newSliderValue);
  }

  render() {
    const { textColor, backgroundColor, graph, accessibleContrast } = this.props;
    const { colorType, colorParameter, sliderValue } = graph;
    const isTextColor = (colorType === 'textColor');
    const constantColorValue = (isTextColor ? backgroundColor.value : textColor.value);
    const modifiedColor = {
      h: isTextColor ? textColor.hue : backgroundColor.hue,
      s: isTextColor ? textColor.saturation : backgroundColor.saturation,
      l: isTextColor ? textColor.lightness : backgroundColor.lightness
    };
    const xAxisTitle = `${isTextColor ? 'Text' : 'Background'} color ${colorParameter}`;
    const maxXvalue = (colorParameter === 'hue' ? 360 : 100);
    const currentYvalue = getContrast(constantColorValue, modifiedColor, colorParameter, sliderValue);
    const graphData = getGraphData(constantColorValue, modifiedColor, colorParameter, maxXvalue);

    const data = {
      series: [
        {
          name: 'axes',
          data: [
            { x: 0, y: 1 },
            { x: maxXvalue * 1.05, y: 1 },
            null,
            { x: 0, y: 1 },
            { x: 0, y: 21 * 1.05 }
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
            { x: sliderValue, y: currentYvalue }
          ]
        }
      ]
    };

    const options = {
      axisX: {
        type: Chartist.FixedScaleAxis,
        low: 0,
        high: maxXvalue * 1.05,
        ticks: [0, maxXvalue],
        showGrid: false
      },
      axisY: {
        type: Chartist.FixedScaleAxis,
        low: 1,
        high: 21 * 1.05,
        ticks: [1, accessibleContrast, 21],
        showGrid: false
      },
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: xAxisTitle,
            axisClass: 'ct-axis-title',
            offset: {
              x: 325,
              y: 5
            },
            textAnchor: 'start'
          },
          axisY: {
            axisTitle: 'Contrast ratio',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 15
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

    const responsiveOptions = [
      ['(min-width: 510px) and (max-width: 767px)', {
        chartPadding: {
          top: 20,
          right: 140,
          bottom: 0,
          left: 5
        }
      }],
      ['(min-width: 768px)', {
        chartPadding: {
          top: 20,
          right: 140,
          bottom: 0,
          left: 5
        }
      }]
    ];

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
                             data={data}
                             options={options}
                             responsiveOptions={responsiveOptions}
                             eventHandlers={eventHandlers} />
            </div>
            <ReactSlider min={0}
                         max={maxXvalue}
                         step={0.5}
                         value={sliderValue}
                         className={styles.slider}
                         handleClassName={styles.handle}
                         handleActiveClassName={styles.activeHandle}
                         onChange={this.onChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeBehindTheScenes);
