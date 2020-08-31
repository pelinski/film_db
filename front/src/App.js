import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import regeneratorRuntime from "regenerator-runtime"
import './App.scss';
import { AddFilmPage } from './pages/AddFilm.page';
import { Layout } from "./pages/Layout"

export const App = () => (<>
  <Router>
    <Layout>
      <Switch>
        <Route path="/add" exact component={AddFilmPage} />
      </Switch>
    </Layout>
  </Router>


</>
);