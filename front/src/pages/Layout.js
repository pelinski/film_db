import React from 'react'
import { Link } from 'react-router-dom'



export const Layout = ({ children }) => (
  <>
    <div id="container">
      <header>
        <Link to={"/"}>
          <marquee loop="infinite" direction="up" behavior="scroll" > <h1 id="site-title" className="vertical-text">FILMDB</h1></marquee>
        </Link>
      </header>
      <div id="content">
        {children}
      </div>
    </div>
  </>
)