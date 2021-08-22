import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Theme from './Theme.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

export default function App() {
  return (
    <Router>
      <Theme>
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Theme>
    </Router>
  );
}
