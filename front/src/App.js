import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import regeneratorRuntime from "regenerator-runtime"
import './App.scss';
import { AddFilmPage } from './pages/AddFilm.page';

export const App = () => (<>
  <Router>
    <Switch>
      <Route path="/add" exact component={AddFilmPage} />

    </Switch>
  </Router>


</>
);