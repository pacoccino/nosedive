import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
let { connect } = require('lotion');

const NodeClientContext = React.createContext();
const GCI = 'd6e0f0d0d9ba6d54a7e680f950ddee3504775ae42a89cb1279974e67b3db14f3'

const NodeClientProvider = (props) => {
  const [users, setUsers] = useState({});
  const [wallet] = useState(ethers.Wallet.createRandom());
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
   if(node) {
     updateUsers().catch(console.error);
   }
  }, [node])

  async function updateUsers() {
    const _users = await node.state.users;
    setUsers(_users);
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

  const providerValues = { users, sendRating, node };

  return (
    <NodeClientContext.Provider value={providerValues}>
      {props.children}
    </NodeClientContext.Provider>
  );
}

export { NodeClientContext, NodeClientProvider };