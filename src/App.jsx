import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { themeTypeSelector } from './services/redux/slices/themeSlice/themeSelectors';
import Theme from './Theme.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import { authStatusSelector } from './services/redux/slices/authSlice/authSelectors';
import socket from './services/socket';

export default function App() {
  const themeType = useSelector((state) => themeTypeSelector(state));
  const authStatus = useSelector((state) => authStatusSelector(state));
  const isLogged = useMemo(() => authStatus === 'logged', [authStatus]);

  useEffect(() => {
    if (isLogged) {
      socket.connect();
    }
  }, [isLogged]);

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
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
        </Switch>
      </Theme>
    </Router>
  );
}
