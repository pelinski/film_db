import React from 'react'
import { Link } from 'react-router-dom'



export const Layout = ({ children }) => (
  <>
    <div id="container">
      <header>
        <Link to={"/"}>
          <h1 id="site-title">FILMDB</h1>
        </Link>
      </header>
      <div id="content">
        {children}
      </div>
    </div>
  </>
)