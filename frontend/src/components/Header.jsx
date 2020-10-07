import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Link as RouterLink,
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NodeClientContext } from '../providers/NodeClient';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  address: {
    maxWidth: 200,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }
}));

export default function Header() {
  const classes = useStyles();
  const { myAddress } = useContext(NodeClientContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Link component={RouterLink} to="/" color="inherit" className={classes.title}>
          <Typography variant="h6">
            Users rating
          </Typography>
        </Link>

        <Typography variant="body1" align="right" className={classes.address}>
          {myAddress}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
