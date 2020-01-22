import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Home from  './Home'

export const NotFound = () => (
  <h1>Page Not Found</h1>
);

const App = () => {

  return (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
</Router>
  )
}

export default withRouter(App);
