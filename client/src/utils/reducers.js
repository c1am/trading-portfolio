import {
  UPDATE_STOCK
} from "./actions";

const initialState = {
  stocks: []
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STOCK:
      return {
        ...state,
        stocks: [...action.stocks],
      };

    default:
      return state;
  }
};

export default reducers;