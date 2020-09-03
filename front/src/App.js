import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import regeneratorRuntime from "regenerator-runtime"
import './App.scss';
import { AddFilmPage } from './pages/AddFilm.page';
import { Layout } from "./pages/Layout"
import Favicon from "react-favicon"
import favicon from "./public/favicon.svg"

export const App = () => (<>
  <Favicon url={favicon} />
  <Router>
    <Layout>
      <Switch>
        <Route path="/add" exact component={AddFilmPage} />
      </Switch>
    </Layout>
  </Router>



</>
);