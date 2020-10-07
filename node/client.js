let { connect } = require('lotion')
const { ethers } = require('ethers');

let GCI = '0f8d091fb12323ee01fdd91108120ed489cb0ad34a8751e40faa9c895289622a'

const wallet = ethers.Wallet.createRandom();
const wallet_bis = ethers.Wallet.createRandom();

async function app() {

  let { state, send } = await connect(GCI, {
    nodes: [`ws://localhost:26612`]
  });

  const claim = {
    user: wallet_bis.address,
    rater: wallet.address,
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