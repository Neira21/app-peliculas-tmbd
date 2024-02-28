import React from 'react'
import style from './Header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={style.header}>
      <ul className={style.navbar}>
        <li>
          <Link to='/'>
            Inicio
          </Link>
        </li>
        <li>
          <Link to='/peliculalista'>
            Peliculas
          </Link>
          </li>
      </ul>
    </header>
  )
}

export default Header