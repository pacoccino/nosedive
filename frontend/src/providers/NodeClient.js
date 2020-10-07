import React, { useState, useEffect, useCallback } from 'react';
let { connect } = require('lotion');

const NodeClientContext = React.createContext();
const GCI = '6f52ef58cb5eff44eb03198b39094d821aa57d540e80feca7af6c82e4fd33420'

const NodeClientProvider = (props) => {
  const [users, setUsers] = useState({});
  const [node, setNode] = useState(null);

  useEffect(() => {
    (async () => {
      let _node = await connect(GCI, {
        nodes: [`ws://localhost:26612`]
      });
      setNode(_node);
      const _users = await _node.state.users;
      setUsers(_users);
      console.log(_users);
    })();
  }, []);

  const sendTransaction = useCallback(async (tx) => {
    if(!node) {
      throw new Error('node not initialized');
    }

    return node.send(tx);
  }, [node]);

  const providerValues = { users, sendTransaction, node };

  return (
    <NodeClientContext.Provider value={providerValues}>
      {props.children}
    </NodeClientContext.Provider>
  );
}

export { NodeClientContext, NodeClientProvider };