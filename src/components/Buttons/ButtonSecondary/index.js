import React from 'react';
import style from './style.scss';

const ButtonSecondary = props => {
  return (
    <button {...props} className={style.btn__auth}>Вход в Личный кабинет</button>
  );
};

export default ButtonSecondary;
