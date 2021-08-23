import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home.jsx';
import Theme from './Theme.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import { themeTypeSelector } from './services/redux/slices/themeSlice/themeSelectors';

export default function App() {
  const themeType = useSelector((state) => themeTypeSelector(state));

  return (
    <Router>
      <Theme type={themeType}>
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
