import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as topicsSelectors from '../store/topics/reducer';
import PropTypes from 'prop-types';
import PageLayout from '../layouts';
import RouterApp from '../containers/RouterApp';
import NavBar from './NavBar';
import Footer from './Footer';
import Header from './Header';
import style from '../styles/styles.scss';

import * as topicsActions from '../store/topics/actions';

// сам компонент
class App extends Component {

  reset() {
    this.props.topicsActions.clearTopics();
  }

  render() {
    return (
      <PageLayout>
        <div className={style.App}>
          <Header />
          <NavBar onReset={this.reset}/>
          <RouterApp />
          <Footer />
        </div>
      </PageLayout>
    );
  }
}

// подключаем state к props компонента
function mapStateToProps(state) {
  return {
    isSelectionFinalized: topicsSelectors.isTopicSelectionFinalized(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    topicsActions: bindActionCreators(topicsActions, dispatch)
  };
}

// говорим что prop isSelectionFinalized будет обязательной бульвой
App.propTypes = {
  isSelectionFinalized: PropTypes.bool.isRequired,
  topicsActions: PropTypes.object.isRequired
};

// экспортируем подключенный к store комопонент
// при каждом изменении "state.topics.selectionFinalized" компонент App будет перерисовываться
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
