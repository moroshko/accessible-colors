import React, { Component, PropTypes } from 'react';
import Chartist from 'chartist';

export default class ChartistGraph extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    responsiveOptions: PropTypes.array,
    eventHandlers: PropTypes.object
  };

  static defaultProps = {
    className: '',
    options: {},
    responsiveOptions: [],
    eventHandlers: {}
  };

  componentDidMount() {
    const { type, data, options, responsiveOptions, eventHandlers } = this.props;

    this.chart = new Chartist[type](this.refs.chartElement, data, options, responsiveOptions);

    for (const event in eventHandlers) {
      this.chart.on(event, eventHandlers[event]);
    }
  }

  componentWillReceiveProps(newProps) {
    const { data, options, responsiveOptions } = newProps;

    this.chart.update(data, options, responsiveOptions);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`ct-chart ${className}`} ref="chartElement" />
    );
  }
}
