import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';

export default function App() {
  return (
    <Router>
      <Switch>
        <Welcome />
      </Switch>
    </Router>
  );
}
