let { connect } = require('lotion')
const { ethers } = require('ethers');

let GCI = '6f52ef58cb5eff44eb03198b39094d821aa57d540e80feca7af6c82e4fd33420'

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