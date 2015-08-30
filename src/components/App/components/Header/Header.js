import styles from './Header.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSocialCounts } from 'actions/app';
import { REPO } from 'constants';
import SocialButton from 'SocialButton/SocialButton';

const GITHUB_HREF = `https://github.com/${REPO}`;
const TWITTER_TEXT =
  encodeURIComponent('Simple tool to test text/background contrast ratio and automatically find closest accessible colors');
const TWITTER_URL = encodeURIComponent('http://accessible-colors.com');
const TWITTER_HASHTAGS = 'WCAG,a11y';
const TWITTER_HREF = `https://twitter.com/intent/tweet?text=${TWITTER_TEXT}&url=${TWITTER_URL}&hashtags=${TWITTER_HASHTAGS}`; // eslint-disable-line no-unused-vars

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

    loadSocialCounts: PropTypes.func.isRequired,

    isMinified: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { loadSocialCounts } = this.props;

    loadSocialCounts();
  }

  render() {
    const { isMinified, githubStars, twitterCount } = this.props; // eslint-disable-line no-unused-vars

    return (
      <header className={isMinified ? styles.minifiedContainer : styles.fullContainer}>
        <div className={isMinified ? styles.minifiedInnerContainer : styles.fullInnerContainer}>
          <h1 className={isMinified ? styles.minifiedHeader : styles.fullHeader}>
            Accessible colors
          </h1>
          {
            !isMinified &&
              <p className={styles.subHeader}>
                Automatically find closest accessible color combination
              </p>
          }
          <p className={isMinified ? styles.minifiedSocialButtons : styles.fullSocialButtons}>
            <SocialButton isMinified={isMinified}
                          icon="icon-circle-github" count={githubStars}
                          color="#212121" hoverColor="#4078c0"
                          href={GITHUB_HREF} openInNewTab={true} />
            {/*
            <SocialButton isMinified={isMinified}
                          className={styles.twitterButton}
                          icon="icon-circle-twitter" count={twitterCount}
                          color="#212121" hoverColor="#55acee"
                          href={TWITTER_HREF} />
            */}
          </p>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
