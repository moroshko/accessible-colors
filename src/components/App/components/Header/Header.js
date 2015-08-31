import styles from './Header.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSocialCounts, updateHeader } from 'actions/app';
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
    twitterCount: state.twitterCount,
    isHeaderMinified: state.isHeaderMinified
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSocialCounts: () => dispatch(loadSocialCounts()),
    updateHeader: isMinified => dispatch(updateHeader(isMinified))
  };
}

class Header extends Component {
  static propTypes = {
    githubStars: PropTypes.string.isRequired,
    twitterCount: PropTypes.string.isRequired,
    isHeaderMinified: PropTypes.bool.isRequired,

    loadSocialCounts: PropTypes.func.isRequired,
    updateHeader: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadSocialCounts, isHeaderMinified, updateHeader } = this.props;

    loadSocialCounts();

    document.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        updateHeader(false);
      } else if (!isHeaderMinified) {
        updateHeader(true);
      }
    });
  }

  render() {
    const { githubStars, twitterCount, isHeaderMinified } = this.props; // eslint-disable-line no-unused-vars

    return (
      <header className={isHeaderMinified ? styles.minifiedContainer : styles.fullContainer}>
        <div className={isHeaderMinified ? styles.minifiedInnerContainer : styles.fullInnerContainer}>
          <h1 className={isHeaderMinified ? styles.minifiedHeader : styles.fullHeader}>
            Accessible colors
          </h1>
          <p className={isHeaderMinified ? styles.minifiedSubHeader : styles.fullSubHeader}>
            Automatically find the closest accessible color combination
          </p>
          <p className={isHeaderMinified ? styles.minifiedSocialButtons : styles.fullSocialButtons}>
            <SocialButton isMinified={isHeaderMinified}
                          icon="icon-circle-github" count={githubStars}
                          color="#212121" hoverColor="#4078c0"
                          href={GITHUB_HREF} openInNewTab={true} />
            {/*
            <SocialButton className={isHeaderMinified ? styles.minifiedTwitterButton : styles.fullTwitterButton}
                          isMinified={isHeaderMinified}
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
