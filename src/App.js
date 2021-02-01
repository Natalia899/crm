import './App.css';
import React from 'react';
import NavBar from './components/NavBar';
import Clients from './components/clients/Clients';
import Actions from './components/actions/Actions';
import Analytics from './components/analytics/Analytics';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact render={() => <Clients />} />
      <Route path="/actions" exact render={() => <Actions />} />
      <Route path="/analytics" exact render={() => <Analytics />} />
    </Router>
  );
}


