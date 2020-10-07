import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
let { connect } = require('lotion');

const NodeClientContext = React.createContext();
const GCI = process.env.REACT_APP_GCI || '6668f4ca32e91b167ae7674037c8dcf60340f5724fbf2d01b7af21542f344fb0'

function getWallet() {
  const privateKey = localStorage.getItem('privateKey');
  if(privateKey) {
    return new ethers.Wallet(privateKey);
  } else {
    const wallet = ethers.Wallet.createRandom();
    localStorage.setItem('privateKey', wallet.privateKey);
    return wallet;
  }
}

const NodeClientProvider = (props) => {
  const [users, setUsers] = useState({});
  const [wallet, setWallet] = useState(getWallet);
  const [node, setNode] = useState(null);

  useEffect(() => {
    (async () => {
      let _node = await connect(GCI, {
        nodes: [`ws://localhost:26612`]
      });
      setNode(_node);
    })();
  }, []);


  useEffect(() => {
    let interval;
    if(node) {
      updateUsers().catch(console.error);
      interval = setInterval(() => {
        updateUsers().catch(console.error);
      }, 2000);
    }
    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  }, [node])

  async function updateUsers() {
    const _users = await node.state.users;
    setUsers(_users);
    console.log(_users);
  }

  const sendRating = async (ratedUser, rating) => {
    const claim = {
      ratedUser: ratedUser,
      raterUser: wallet.address,
      rating,
    };

    const rawClaim = JSON.stringify(claim);
    const proof = await wallet.signMessage(rawClaim);

    const tx = {
      rawClaim,
      proof,
    };

    let result = await node.send(tx);
    console.log(result)
    await updateUsers();

  };

  async function logout() {
    localStorage.removeItem('privateKey');
    setWallet(getWallet());
  }

  const providerValues = {
    users,
    sendRating,
    node,
    myAddress: wallet.address,
    logout
  };

  return (
    <NodeClientContext.Provider value={providerValues}>
      {props.children}
    </NodeClientContext.Provider>
  );
}

export { NodeClientContext, NodeClientProvider };