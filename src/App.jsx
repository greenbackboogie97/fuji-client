import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { themeTypeSelector } from './services/redux/slices/themeSlice/themeSelectors';
import Theme from './Theme.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import {
  authStatusSelector,
  authUserSelector,
} from './services/redux/slices/authSlice/authSelectors';
import socket, {
  cleanupContactsListener,
  cleanupMessageListener,
  connectSocket,
  contactsListenerAndUpdate,
  messageListenerAndUpdate,
} from './services/socket';
import { addMessage, updateContacts } from './services/redux/slices/chatSlice/chatReducer';

export default function App() {
  const dispatch = useDispatch();
  const themeType = useSelector((state) => themeTypeSelector(state));
  const authUser = useSelector((state) => authUserSelector(state));
  const authStatus = useSelector((state) => authStatusSelector(state));
  const isLogged = useMemo(() => authStatus === 'logged', [authStatus]);

  useEffect(() => {
    if (isLogged && !socket.connected) {
      connectSocket(authUser._id);
      contactsListenerAndUpdate((contacts) => dispatch(updateContacts(contacts)));
      messageListenerAndUpdate((message) => dispatch(addMessage(message)));
    }

    return () => {
      cleanupContactsListener();
      cleanupMessageListener();
    };
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
