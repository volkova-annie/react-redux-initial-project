import React from 'react';
import ButtonSecondary from '../Buttons/ButtonSecondary';
import style from './style.scss';

const Footer = props => {

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <ul className={style.header__list}>
          <li className={style.header__listItem}>Круглосуточная поддержка</li>
          <li className={style.header__listItem}>
            <a className={style.phone} href="tel:+78001008000">8-800-100-8000</a>
          </li>
        </ul>
        <ButtonSecondary onClick={() => alert('hello')} />
      </header>
    </div>
  );
};

export default Footer;
