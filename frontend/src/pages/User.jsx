import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Rating from '@material-ui/lab/Rating';
import { useHistory, useParams } from 'react-router-dom';

import { NodeClientContext } from "../providers/NodeClient";

import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import moment from 'moment';

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
  const history = useHistory();
  const { address } = useParams();
  const { users, sendRating, myAddress } = useContext(NodeClientContext);
  const user = users[address];
  const myRating = user && user.ratings.find(r => r.raterUser === myAddress);
  const [sendingRating, setSendingRating] = useState(false);

  async function rate(rating) {
    setSendingRating(true);
    await sendRating(address, rating);
    setSendingRating(false);
  }

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
                <Typography gutterBottom variant="body1" component="h2" className={classes.userTitle}>
                  Average note
                </Typography>
                <Rating name="average-rating" readOnly value={user.rating} precision={0.5}/>
              </CardContent>
            </CardActionArea>
            {myRating ?
              <CardActions>
                <Typography gutterBottom variant="body1" component="h2" className={classes.userTitle}>
                  You gave {myRating.rating} ⭐️ to this user.
                </Typography>
              </CardActions>
              :
              (
                sendingRating ?
                  <CardActions>
                    <CircularProgress/>
                  </CardActions>
                  :
                  <CardActions>
                    <Typography gutterBottom variant="body1" component="h2" className={classes.userTitle}>
                      Give a note
                    </Typography>
                    <Rating name="give-rating" precision={1} onChange={(_, newValue) => rate(newValue)}/>
                  </CardActions>
              )
            }
          </Card>

          {user.ratings.length > 0 ?
            <Box my={5}>
              <Typography variant="h6">
                Ratings
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Dates</TableCell>
                      <TableCell align="right">Rating given</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {user.ratings.map((row) => (
                      <TableRow key={address} hover onClick={() => history.push(`/users/${row.raterUser}`)} >
                        <TableCell component="th" scope="row">
                          {row.raterUser}
                        </TableCell>
                        <TableCell scope="row">
                          {moment.unix(row.time).fromNow()}
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
            <Typography variant="body1">
              No one has rated this user
            </Typography>
          }
        </Box>
      }
    </Box>
  );
}
