import styles from './App.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'Header/Header';
import UserInput from 'UserInput/UserInput';
import UserInputError from 'UserInputError/UserInputError';
import Preview from 'Preview/Preview';
import Footer from 'Footer/Footer';

function mapStateToProps(state) {
  return {
    textColor: state.textColor,
    fontSize: state.fontSize,
    backgroundColor: state.backgroundColor
  };
}

class App extends Component {
  static propTypes = {
    textColor: PropTypes.object.isRequired,
    fontSize: PropTypes.object.isRequired,
    backgroundColor: PropTypes.object.isRequired
  };

  isUserInputValid() {
    const { textColor, fontSize, backgroundColor } = this.props;

    return textColor.isValueValid && fontSize.isValid && backgroundColor.isValueValid;
  }

  render() {
    return (
      <div className={styles.container}>
        <Header />
        <UserInput />
        {this.isUserInputValid() ? <Preview /> : <UserInputError />}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
