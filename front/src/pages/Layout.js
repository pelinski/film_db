import React from 'react'



export const Layout = ({ children }) => (
  <>
    <div id="container">
      <header>
        <h1 id="site-title">FILM DB</h1>
      </header>
      <div id="content">
        {children}
      </div>
    </div>
  </>
)