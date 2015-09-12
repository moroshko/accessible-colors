import styles from './Header.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSocialCounts } from 'actions/app';
import { REPO } from 'constants';
import SocialButton from 'SocialButton/SocialButton';

const GITHUB_HREF = `https://github.com/${REPO}`;
const TWITTER_TEXT =
  encodeURIComponent('A simple tool to test background/text contrast ratio and automatically find the closest accessible colors');
const TWITTER_URL = encodeURIComponent('http://accessible-colors.com');
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
          <h2 className={styles.subHeader}>
            Automatically find the closest accessible color combination
          </h2>
          <div className={styles.socialButtons}>
            <SocialButton icon="icon-circle-github" count={githubStars}
                          color="#212121" hoverColor="#4078c0"
                          href={GITHUB_HREF} openInNewTab={true} />
            <SocialButton className={styles.twitterButton}
                          icon="icon-circle-twitter" count={twitterCount}
                          color="#212121" hoverColor="#55acee"
                          href={TWITTER_HREF} />
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
