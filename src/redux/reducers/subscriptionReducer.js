/* eslint-disable no-case-declarations */
import {
  SET_SUBSCRIPTION_USER_DATA,
  RESET_SUBSCRIPTION_USER_DATA,
} from '../constants/ActionTypes';
const initialState = {
  subscription: {},
  caseType: '',
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTION_USER_DATA:
      console.log('hey shiftReducer :', action.data);
      const subscription = action.data;
      console.log('hey shiftReducer :', subscription.status);
      let caseType;
      if (subscription.status === 'ACTIVE' && subscription.type === 'TRIAL') {
        caseType = 'trail_at'; // only reminder screen
      } else if (
        subscription.status === 'EXPIRED' &&
        subscription.type === 'TRIAL'
      ) {
        caseType = 'trail_et'; // only payment screen
      } else if (
        subscription.status === 'ACTIVE' &&
        subscription.type === 'SUBSCRIBED'
      ) {
        caseType = 'suscribe_as'; // only home screen
      } else if (
        subscription.status === 'EXPIRED' &&
        subscription.type === 'SUBSCRIBED'
      ) {
        caseType = 'suscribe_es'; // only home screen
      } else if (
        subscription.status === 'ACTIVE' &&
        subscription.type === 'DELETED'
      ) {
        caseType = 'cancelled'; // only home screen
      }
      console.log('hey in subscriptionReducer:', caseType);
      return {
        ...state,
        subscription: action.data,
        caseType: caseType,
      };

    case RESET_SUBSCRIPTION_USER_DATA:
      return {
        ...state,
        subscription: {},
        caseType: '',
      };

    case 'UPDATE_SUBSCRIPTION_CANCELLED_DATA':
      return {
        ...state,

        caseType: 'cancelled',
      };

    case RESET_SUBSCRIPTION_USER_DATA:
      return {
        ...state,
        subscription: {},
        caseType: '',
      };

    default:
      return state;
  }
};
