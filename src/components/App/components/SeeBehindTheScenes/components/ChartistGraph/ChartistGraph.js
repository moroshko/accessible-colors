import React, { Component, PropTypes } from 'react';
import Chartist from 'chartist';

export default class ChartistGraph extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    eventHandlers: PropTypes.object
  };

  static defaultProps = {
    className: '',
    options: {},
    eventHandlers: {}
  };

  componentDidMount() {
    const { type, data, options, eventHandlers } = this.props;

    this.chart = new Chartist[type](this.refs.chartElement, data, options);

    for (const event in eventHandlers) {
      this.chart.on(event, eventHandlers[event]);
    }
  }

  componentWillReceiveProps(newProps) {
    const { data, options } = newProps;

    this.chart.update(data, options);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`ct-chart ${className}`} ref="chartElement" />
    );
  }
}
