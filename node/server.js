const lotion = require('lotion');

const { initialState, transactionHandler } = require('./stateManager');

async function main() {
  let app = lotion({
    initialState,
    p2pPort: process.env.P2P_PORT || 26611,
    rpcPort: process.env.RPC_PORT || 26612,
  });

  app.use(transactionHandler);

  let { GCI } = await app.start();
  console.log('Node started');
  console.log('GCI:', GCI);
}

main().catch(console.error);