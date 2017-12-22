// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as topicsActions from '../store/topics/actions';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import Filter from '../components/Filter';
import style from '../styles/styles.scss';

class TopicsScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.topicsActions.fetchTopics();
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(topicUrl, topic) {
    const selected = this.props.selectedTopicsByUrl[topicUrl];
    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.props.topicsActions.selectTopic}
        selected={selected}>
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    );
  }

  render() {
    if (!this.props.topicsByUrl) return this.renderLoading();
    return (
      <div className={style.TopicsScreen}>
        <h3>Choose 3 topics of interest</h3>
        <div className={style.FilterWrapper}>
          <span>Filter topics by:</span>
          <Filter
            onClick={this.props.topicsActions.filter}
            filterBy="title"
            isActive={this.props.activeFilter}
            isReverse={this.props.filterIsReverse}
          />
          <Filter
            onClick={this.props.topicsActions.filter}
            filterBy="date"
            isActive={this.props.activeFilter}
            isReverse={this.props.filterIsReverse}
          />
        </div>
        <ListView
          rowsIdArray={this.props.topicsUrlArray}
          rowsById={this.props.topicsByUrl}
          renderRow={this.renderRow} />
        {!this.props.canFinalizeSelection ? false :
          <button className={style.NextScreen} onClick={this.props.topicsActions.finalizeTopicSelection} />
        }
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const [topicsByUrl, topicsUrlArray] = topicsSelectors.getTopics(state);
  const [activeFilter, filterIsReverse] = topicsSelectors.getCurrentFilter(state);
  return {
    topicsByUrl,
    topicsUrlArray,
    activeFilter,
    filterIsReverse,
    selectedTopicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    topicsActions: bindActionCreators(topicsActions, dispatch)
  };
}

TopicsScreen.propTypes = {
  topicsActions: PropTypes.object.isRequired,
  activeFilter: PropTypes.string.isRequired,
  filterIsReverse: PropTypes.bool.isRequired,
  topicsUrlArray: PropTypes.array.isRequired,
  canFinalizeSelection: PropTypes.bool.isRequired,
  selectedTopicsByUrl: PropTypes.object.isRequired,
  topicsByUrl: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsScreen);
