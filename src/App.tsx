/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Provider} from 'react-redux';
import NavSelect from './NavSelect';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/lib/integration/react';

const App: () => JSX.Element = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavSelect />
      </PersistGate>
    </Provider>
    // </SafeAreaView>
  );
};

export default App;
