/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';


import { Provider } from 'react-redux';
import store from './src/store/RootStore';
import AppNavigation from './src/navigation/AppNavigation';
import { View } from 'react-native';

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

function App() {

  return <Provider store={store}>
    <AppNavigation/>
  </Provider>
}


export default App;
