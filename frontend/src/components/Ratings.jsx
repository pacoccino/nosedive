import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating/Rating';
import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';

export default function Ratings({ ratings }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(users).map(([address, userData]) => (
            <TableRow key={address} component={Link} to={`/users/${address}`} >
              <TableCell component="th" scope="row">
                {address}
              </TableCell>
              <TableCell align="right">
                ({userData.ratings.length}) <Rating name="user-rating" readOnly defaultValue={userData.rating} precision={0.5} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}