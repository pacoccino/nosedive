import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
} from "react-router-dom";

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NodeClientProvider } from './providers/NodeClient';

import Users from './pages/Users'
import User from './pages/User'

function App() {
  return (
    <Router>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit">
            <Typography variant="h6">
              Users rating
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <NodeClientProvider>
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
