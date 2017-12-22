import React from 'react';
import style from './style.scss';

const ButtonPrimary = props => {

  return (
    <button className={style.btn__primary}>{props.children}</button>
  );
};

export default ButtonPrimary;
