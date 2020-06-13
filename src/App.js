import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import RegionsPage from 'views/RegionsPage'
import CountryPage from 'views/CountryPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" exact component={RegionsPage}/>
            <Route path="/:alphaCode"  exact component={CountryPage}/>
            <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
