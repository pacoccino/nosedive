let { connect } = require('lotion')
const { ethers } = require('ethers');

let GCI = 'dfd35d58a6987b83818ee7ba23998418612138f979704171e0839fe368aa9027'

const wallet = ethers.Wallet.createRandom();
const wallet_bis = ethers.Wallet.createRandom();

async function app() {

  let { state, send } = await connect(GCI, {
    nodes: [`ws://localhost:26612`]
  });

  const claim = {
    raterUser: wallet.address,
    ratedUser: wallet_bis.address,
    rating: 9,
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