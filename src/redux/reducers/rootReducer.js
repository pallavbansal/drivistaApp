import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {vehicleReducer} from './vehicleReducer';

export const rootReducer = combineReducers({
  userState: userReducer,
  vehicleState: vehicleReducer,
});
