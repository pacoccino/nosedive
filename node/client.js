let { connect } = require('lotion')
const { ethers } = require('ethers');

let GCI = '83843d3b17c36d935df6d630dc2db8e4a31a101c9617f6ff67d4223b4ff7169b'

const wallet = ethers.Wallet.createRandom();
const wallet_bis = ethers.Wallet.createRandom();

async function app() {

  let { state, send } = await connect(GCI, {
    nodes: [`ws://localhost:26612`]
  });

  const claim = {
    raterUser: wallet.address,
    ratedUser: wallet_bis.address,
    rating: 2,
    // timestamp: Date.now,
  };

  const rawClaim = JSON.stringify(claim);
  const proof = await wallet.signMessage(rawClaim);

  const tx = {
    rawClaim,
    proof,
  };

  let result = await send(tx)

  console.log(result)

  const users = await state.users;

  console.log(users)
}

app().catch(console.error);