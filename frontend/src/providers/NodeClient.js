import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
let { connect } = require('lotion');

const NodeClientContext = React.createContext();
const GCI = 'd6e0f0d0d9ba6d54a7e680f950ddee3504775ae42a89cb1279974e67b3db14f3'

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
  const [wallet] = useState(getWallet);
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

  const providerValues = {
    users,
    sendRating,
    node,
    myAddress: wallet.address,
  };

  return (
    <NodeClientContext.Provider value={providerValues}>
      {props.children}
    </NodeClientContext.Provider>
  );
}

export { NodeClientContext, NodeClientProvider };