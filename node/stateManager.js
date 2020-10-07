const { ethers } = require('ethers');

function getAverageRating(ratings) {
  if(ratings.length === 0) return 0;
  const ratingsSum = ratings.reduce((acc, { rating }) => (acc + rating), 0);
  const averageRating = ratingsSum / ratings.length;
  return averageRating;
}

const initialState = {
  users: {
    '0x27EA3474c96145887d3914099ce74B4b3Fbf08a9': { rating: 0, ratings: [] },
  },
};

function createUser(state, address, ratingData = []) {
  state.users[address] = {
    rating: 0,
    ratings: ratingData,
  };
}
function updateUser(state, address, ratingData = null) {
  if(state.users[address]) {
    if(!ratingData) throw Error('nothing to update');

    const oldRatings = state.users[address].ratings;
    const newRatings = oldRatings.concat({
      raterUser: ratingData.raterUser,
      rating: ratingData.rating,
    });

    state.users[address].ratings = newRatings;
    state.users[address].rating = getAverageRating(newRatings);
  } else {
    state.users[address] = {
      rating: ratingData ? ratingData.rating : 0,
      ratings: ratingData ? [ratingData] : [],
    };
  }
}

/**
 *
 * @param state
 * @param tx{Object} transaction
 * @param tx.ratedUser {string} user who is rated
 * @param tx.raterUser {string} user who rates
 * @param tx.rating {number} rating given to the rated user by the rater user
 */
function transactionHandler(state, tx) {
  const signerAddress = ethers.utils.verifyMessage(tx.rawClaim, tx.proof);
  const claim = JSON.parse(tx.rawClaim);
  const { ratedUser, raterUser, rating } = claim;

  if (signerAddress !== raterUser) throw new Error('Invalid signature');
  if (!ethers.utils.isAddress(ratedUser)) throw new Error('Invalid target user');

  if (!state.users[raterUser]) createUser(state, raterUser);

  updateUser(state, ratedUser, { raterUser, rating })
}

module.exports = { initialState, transactionHandler };