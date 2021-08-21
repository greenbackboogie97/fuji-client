import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Theme from './Theme.jsx';

export default function App() {
  return (
    <Router>
      <Theme>
        <Switch>
          <Welcome />
        </Switch>
      </Theme>
    </Router>
  );
}
