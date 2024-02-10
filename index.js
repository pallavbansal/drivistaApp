import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store'; // Import your store
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Root = () => (
  <Provider store={store}>
    <StatusBar
      backgroundColor='#412160' // Set your desired background color
      barStyle="dark-content" // Set text color to dark
    />
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
