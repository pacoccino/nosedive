import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import { Link, useParams } from 'react-router-dom';

import { NodeClientContext } from "../providers/NodeClient";

import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  userTitle: {
    fontSize: 12,
  }
});

export default function UserPage({}) {
  const classes = useStyles();
  let { address } = useParams();
  const { users } = useContext(NodeClientContext);
  const user = users[address];

  console.log(user);
  return (
    <Box display="flex" justifyContent="center" my={10}>
      {!user ?
        <CircularProgress/>
        :
        <Box>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/images/profile-picture.jpg"
                title="User"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.userTitle}>
                  {address}
                </Typography>
                <Rating name="user-rating" readOnly defaultValue={user.rating} precision={0.5}/>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Rate
              </Button>
            </CardActions>
          </Card>

          {user.ratings.length > 0 ?
            <Box>
              <Typography variant="p">
                Users who have rated this user:
              </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="right">Rating given</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {user.ratings.map((row) => (
                    <TableRow key={address} component={Link} to={`/users/${row.raterUser}`}>
                      <TableCell component="th" scope="row">
                        {row.raterUser}
                      </TableCell>
                      <TableCell align="right">
                        <Rating name="user-rating" readOnly defaultValue={row.rating} precision={0.5}/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Box>
            :
            <Typography variant="p">
              No one has rated this user
            </Typography>
          }
        </Box>
      }
    </Box>
  );
}
