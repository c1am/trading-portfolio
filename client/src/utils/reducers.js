import {
  UPDATE_COIN
} from "./actions";

const initialState = {
  coins: ["Bitcoin", "Ethereum"],
  value: ["400", "500"]
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COIN:
      return {
        ...state,
        coins: [...action.coins],
      };

    default:
      return state;
  }
};

export default reducers;