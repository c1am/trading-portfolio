import {
  UPDATE_COIN
} from "./actions";

const initialState = {
  stocks: []
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COIN:
      return {
        ...state,
        stocks: [...action.stocks],
      };

    default:
      return state;
  }
};

export default reducers;