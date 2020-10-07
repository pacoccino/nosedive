import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { useHistory } from 'react-router-dom';

import { NodeClientContext } from "../providers/NodeClient";

export default function UsersPage() {
  const history = useHistory();
  const { users } = useContext(NodeClientContext);

  return (
    <Box my={5}>
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
              <TableRow key={address} hover onClick={() => history.push(`/users/${address}`)} >
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
    </Box>
  )
}
