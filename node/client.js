let { connect } = require('lotion')
const { ethers } = require('ethers');

const GCI = process.env.GCI || '6668f4ca32e91b167ae7674037c8dcf60340f5724fbf2d01b7af21542f344fb0'

const wallet = ethers.Wallet.createRandom();
const wallet_bis = ethers.Wallet.createRandom();

async function app() {

  let { state, send } = await connect(GCI, {
    nodes: [`ws://localhost:26612`]
  });

  const claim = {
    raterUser: wallet.address,
    ratedUser: wallet_bis.address,
    rating: 3,
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