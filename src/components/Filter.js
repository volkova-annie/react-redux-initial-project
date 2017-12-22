// components are "dumb" react components that are not aware of redux
// they receive data from their parents through regular react props
// they are allowed to have local component state and view logic
// use them to avoid having view logic & local component state in "smart" components

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from '../styles/styles.scss';

export default class Filter extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  onClick() {
    this.props.onClick(this.props.filterBy);
  }

  isActive() {
    return this.props.isActive === this.props.filterBy;
  }

  renderArrow() {
    if (!this.isActive()) return;
    return this.props.isReverse ? <span>&uarr;</span> : <span>&darr;</span>;
  }

  render() {
    return (
      <span onClick={this.onClick} className={cn(style.Filter, {[style.active] : this.isActive()})}>
        <span>{this.props.filterBy}</span>
        {this.renderArrow()}
      </span>
    );
  }
}

Filter.propTypes = {
  filterBy: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isReverse: PropTypes.bool.isRequired,
};
