import React, {Component} from 'react';
import autoBind from 'react-autobind';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './style.scss';
import ButtonPrimary from '../Buttons/ButtonPrimary';

class NavBar extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  render () {
    return (
      <div>
        <ul className={style.navbar}>
          <li className={style.navbar__item}>
            <NavLink onClick={this.props.onReset}
              to="/">
              TopicsScreen
            </NavLink>
          </li>
            <li className={style.navbar__item}>
            <NavLink
              to="/post">
              PostsScreen
            </NavLink>
          </li>
        </ul>
          <ButtonPrimary>Войти</ButtonPrimary>
      </div>
    );
  }
}

NavBar.propTypes = {
  onReset: PropTypes.func.isRequired
};

export default NavBar;
