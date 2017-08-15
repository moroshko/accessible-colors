import styles from './Header.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSocialCounts } from 'actions/app';
import { SITE_URL, DOMAIN, REPO } from 'constants';
import SocialButton from 'SocialButton/SocialButton';

const GITHUB_HREF = `https://github.com/${REPO}`;
const TWITTER_TEXT =
  encodeURIComponent('A simple tool to test background/text contrast ratio & automatically find the closest accessible colors');
const TWITTER_URL = encodeURIComponent(SITE_URL);
const TWITTER_HASHTAGS = 'WCAG,a11y';
const TWITTER_HREF = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}&url=${TWITTER_URL}&hashtags=${TWITTER_HASHTAGS}`;

function mapStateToProps(state) {
  return {
    githubStars: state.githubStars,
    twitterCount: state.twitterCount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSocialCounts: () => dispatch(loadSocialCounts())
  };
}

class Header extends Component {
  static propTypes = {
    githubStars: PropTypes.string.isRequired,
    twitterCount: PropTypes.string.isRequired,

    loadSocialCounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadSocialCounts } = this.props;

    loadSocialCounts();
  }

  render() {
    const { githubStars, twitterCount } = this.props;

    return (
      <header className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>
            Accessible colors
          </h1>
          <div className={styles.socialButtons}>
            <SocialButton
              icon="icon-circle-github"
              count={githubStars}
              color="#212121"
              hoverColor="#4078c0"
              linkProps={{
                href: GITHUB_HREF,
                target: '_blank',
                'aria-label': `Star ${REPO} on GitHub`,
                'data-link-name': 'Header - GitHub'
              }}
            />
            <SocialButton
              icon="icon-circle-twitter"
              count={twitterCount}
              color="#212121"
              hoverColor="#55acee"
              linkProps={{
                className: styles.twitterButton,
                href: TWITTER_HREF,
                'aria-label': `Share ${DOMAIN} on Twitter`,
                'data-link-name': 'Header - Twitter'
              }}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
