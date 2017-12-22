// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

export default class ListRow extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.onClick(this.props.rowId);
  }

  render() {
    const backgroundColor = this.props.selected ? '#c0f0ff' : '#fff';
    return (
      <div
        style={{ backgroundColor }}
        onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
}

ListRow.propTypes = {
  rowId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  selected: PropTypes.bool
};
