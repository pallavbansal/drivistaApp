import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {vehicleReducer} from './vehicleReducer';
import {driverReducer} from './driverReducer';

export const rootReducer = combineReducers({
  userState: userReducer,
  vehicleState: vehicleReducer,
  driverState: driverReducer,
});
