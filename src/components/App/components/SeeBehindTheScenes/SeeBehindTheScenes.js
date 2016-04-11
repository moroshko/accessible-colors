import styles from './SeeBehindTheScenes.less';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { contrast, hsl2str } from 'utils/color/color';
import { updateGraphSliderValue } from 'actions/app';
import Chartist from 'chartist';
import ChartistGraph from 'ChartistGraph/ChartistGraph';
import GraphInput from 'GraphInput/GraphInput';
import ReactSlider from 'react-slider';
import GraphInfo from 'GraphInfo/GraphInfo';

const accessibleColor = '#3d854d';
const notAccessibleColor = '#ee0000';

function modifyColor(modifiedColor, colorParameter, colorParameterValue) {
  return hsl2str({
    ...modifiedColor,
    [colorParameter[0]]: colorParameterValue
  });
}

function getGraphData(constantColorValue, modifiedColor, colorParameter, maxXvalue) {
  const result = [];

  for (let x = 0; x <= maxXvalue; x += 2) {
    result.push({
      x,
      y: contrast(constantColorValue, modifyColor(modifiedColor, colorParameter, x))
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
    const modifiedColorValue = modifyColor(modifiedColor, colorParameter, sliderValue);
    const maxXvalue = (colorParameter === 'hue' ? 360 : 100);
    const currentYvalue = contrast(constantColorValue, modifiedColorValue);
    const graphData = getGraphData(constantColorValue, modifiedColor, colorParameter, maxXvalue);
    const isAccessible = (currentYvalue >= accessibleContrast);
    const currentPointColor = (isAccessible ? accessibleColor : notAccessibleColor);
    const textColorValue = (isTextColor ? modifiedColorValue : constantColorValue);
    const backgroundColorValue = (isTextColor ? constantColorValue : modifiedColorValue);

    const data = {
      series: [
        {
          name: 'axes',
          data: [
            { x: 0, y: 1 },
            { x: maxXvalue * 1.2, y: 1 },
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
        high: maxXvalue * 1.2,
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
          right: 80,
          bottom: 30,
          left: 5
        }
      }]
    ];

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
              style: `transform: translateX(${[-3, -14, -9][index]}px) translateY(4px)`
            });
          }
        } else if (type === 'line') {
          if (data.series.name === 'axes') {
            const xAxisNameCoords = {
              x: 640,
              y: 360
            };

            data.group.elem('text', xAxisNameCoords, styles.axisName).text(
              colorType === 'textColor' ? 'Text color' : 'Background color'
            );
            data.group.elem('text', {
              x: xAxisNameCoords.x,
              y: xAxisNameCoords.y + 20
            }, styles.axisName).text(colorParameter);

            const yAxisNameCoords = {
              x: -220,
              y: 30
            };

            data.group.elem('text', {
              ...yAxisNameCoords,
              transform: 'rotate(-90)'
            }, styles.axisName).text('Contrast ratio');
          }
        } else if (type === 'point') {
          if (data.series.name === 'currentPoint') {
            data.element.attr({
              style: `stroke: ${currentPointColor}`
            });
          }
        }
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h3 className={styles.title}>
            See behind the scenes
          </h3>
          <div className={styles.content}>
            <GraphInput />
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
                         handleClassName={`${styles.handle} ${isAccessible ? styles.accessibleHandle : styles.notAccessibleHandle}`}
                         handleActiveClassName={styles.activeHandle}
                         onChange={this.onChange} />
            <GraphInfo contrast={currentYvalue}
                       isAccessible={isAccessible}
                       textColorValue={textColorValue}
                       backgroundColorValue={backgroundColorValue} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeBehindTheScenes);
