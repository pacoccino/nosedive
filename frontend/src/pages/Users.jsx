import React, { useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';

import { NodeClientContext } from "../providers/NodeClient";

import { ethers } from 'ethers';

const wallet = ethers.Wallet.createRandom();
const wallet_bis = ethers.Wallet.createRandom();

export default function UsersPage() {
  const { users, sendTransaction } = useContext(NodeClientContext);

  async function rate() {
    const claim = {
      user: wallet_bis.address,
      rater: wallet.address,
      rating: 2,
      // timestamp: Date.now,
    };

    const rawClaim = JSON.stringify(claim);
    const proof = await wallet.signMessage(rawClaim);

    const tx = {
      rawClaim,
      proof,
    };

    let result = await sendTransaction(tx)
    console.log(result)

  }

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
      <button onClick={rate}>rate</button>
    </Box>
  )
}
