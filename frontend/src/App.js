import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Container from '@material-ui/core/Container';
import { NodeClientProvider } from './providers/NodeClient';

import Header from './components/Header'
import Users from './pages/Users'
import User from './pages/User'

function App() {

  return (
    <Router>
      <NodeClientProvider>
        <CssBaseline />

        <Header />

        <Container maxWidth="md">
          <Switch>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route path="/users/:address">
              <User />
            </Route>
            <Route path="*">
              <Redirect to="/users"/>
            </Route>
          </Switch>
        </Container>
      </NodeClientProvider>
    </Router>
  );
}

export default App;
