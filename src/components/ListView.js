// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class ListView extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.renderRowThroughProps(rowId)}
      </li>
    );
  }

  renderRowThroughProps(rowId) {
    return this.props.renderRow(rowId, _.get(this.props.rowsById, rowId));
  }

  render() {
    return (
      <ul>
        {_.map(this.props.rowsIdArray, this.renderRowById)}
      </ul>
    );
  }
}

ListView.propTypes = {
  rowsById: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
  rowsIdArray: PropTypes.array.isRequired
};
