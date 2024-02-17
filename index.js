import React, {useEffect} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';

const Root = () => {

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#412160" barStyle="dark-content" />
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
