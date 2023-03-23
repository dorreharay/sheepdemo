import React from 'react'
import './styles.scss'

function Header() {
  return (
    <header className="header">
      <div className='header__content'>
        <img
          className='header__content--logo'
          src='/assets/images/logo.svg'
          alt="website logo"
        />
      </div>
    </header>
  )
}

export default Header;
