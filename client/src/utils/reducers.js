import {
  UPDATE_COINS
} from "./actions";

const initialState = {
  coins: []
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COINS:
      return {
        ...state,
        coins: [...action.coins],
      };

    default:
      return state;
  }
};

export default reducers;