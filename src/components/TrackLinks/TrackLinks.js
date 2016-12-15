import React, { PropTypes, Component } from 'react';

export default class TrackLinks extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  componentDidMount() {
    if (typeof window.analytics !== 'object') {
      return;
    }

    const links = this.container.querySelectorAll('a');
    const linksCount = links.length;

    for (let i = 0; i < linksCount; i++) {
      const link = links[i];
      const linkName = link.dataset.linkName;
      const event = `Clicked [${linkName}] link`;

      window.analytics.trackLink(link, event);
    }
  }

  storeContainerElement = element => {
    if (element !== null) {
      this.container = element;
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div ref={this.storeContainerElement}>
        {children}
      </div>
    );
  }
}
