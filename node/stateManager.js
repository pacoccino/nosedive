const { ethers } = require('ethers');

function getAverageRating(ratings) {
  if(ratings.length === 0) return 0;
  const ratingsSum = ratings.reduce((acc, { rating }) => (acc + rating), 0);
  const averageRating = ratingsSum / ratings.length;
  return averageRating;
}

const initialState = {
  users: [],
};

function transactionHandler(state, tx) {
  const signerAddress = ethers.utils.verifyMessage(tx.rawClaim, tx.proof);
  const claim = JSON.parse(tx.rawClaim);
  const {user, rater, rating} = claim;

  if (signerAddress !== rater) throw new Error('Invalid signature');
  if (!ethers.utils.isAddress(user)) throw new Error('Invalid target user');

  if (!state.users[user]) {
    state.users[user] = {
      rating,
      ratings: [{rater, rating}],
    }
  } else {
    const oldRatings = state.users[user].ratings;
    const newRatings = oldRatings.concat({rater, rating});

    state.users[user].ratings = newRatings;
    state.users[user].rating = getAverageRating(newRatings);
  }
}

module.exports = { initialState, transactionHandler };