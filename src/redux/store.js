import { createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from './reducers/rootReducer';

// Create a persist config
// const persistConfig = {
//     key: 'root', // Key for the persisted data
//     storage: AsyncStorage, // Storage engine to use (AsyncStorage)
// };

// Create a persisted reducer
//const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = createStore(rootReducer);

// Create the persistor
// export const persistor = persistStore(store);
