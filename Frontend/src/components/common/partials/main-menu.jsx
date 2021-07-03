import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './style.sass'

export default function MainMenu(props) {
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(window.location.href)
  })

  return (
    <nav className="main-nav">
      <ul className="menu sf-arrows">
        <li className={`megamenu-container`} id="menu-home">
          <Link to={`${process.env.PUBLIC_URL}/`} className="sf-with-ul">
            Home
          </Link>
        </li>
        <li className={path.indexOf('shop') > -1 ? 'active' : ''}>
          <Link to={`${process.env.PUBLIC_URL}/shop`} className="sf-with-ul">
            Shop
          </Link>
        </li>
        <li className={path.indexOf('about/') > -1 ? 'active' : ''}>
          <Link to={`${process.env.PUBLIC_URL}/about`} className="sf-with-ul">
            About
          </Link>
        </li>

        <li className={path.indexOf('blog/') > -1 ? 'active' : ''}>
          <Link to={`${process.env.PUBLIC_URL}/blog`} className="sf-with-ul">
            Blog
          </Link>
        </li>

        <li className={path.indexOf('contact/') > -1 ? 'active' : ''}>
          <Link to={`${process.env.PUBLIC_URL}/contact`} className="sf-with-ul">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
