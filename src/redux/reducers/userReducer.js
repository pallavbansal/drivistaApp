/* eslint-disable no-case-declarations */
import {
    GET_REGISTER_REQUEST
} from '../constants/ActionTypes'
const initialState = {

};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTER_REQUEST:
      console.log('hey:', action.data);
      return {
        ...state,

      };

    default:
      return state;
  }
};
