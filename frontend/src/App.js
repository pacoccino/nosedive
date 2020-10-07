import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Nosedive
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route path="*">
              <div>hello</div>
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
