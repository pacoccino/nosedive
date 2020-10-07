let { connect } = require('lotion')
const { ethers } = require('ethers');

let GCI = 'd6e0f0d0d9ba6d54a7e680f950ddee3504775ae42a89cb1279974e67b3db14f3'

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