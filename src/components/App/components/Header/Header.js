import styles from './Header.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadGithubStars } from 'actions/app';
import SocialButton from 'SocialButton/SocialButton';

function mapStateToProps(state) {
  return {
    githubStars: state.githubStars
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadGithubStars: () => dispatch(loadGithubStars())
  };
}

class Header extends Component {
  static propTypes = {
    githubStars: PropTypes.string.isRequired,
    loadGithubStars: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadGithubStars } = this.props;

    loadGithubStars();
  }

  render() {
    const { githubStars } = this.props;

    return (
      <header className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>
            Accessible colors
          </h1>
          <p className={styles.subHeader}>
            Automatically find closest accessible color combination
          </p>
          <p>
            <SocialButton icon="icon-circle-github" count={githubStars} />
          </p>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
