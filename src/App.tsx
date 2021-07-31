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
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {useRef} from 'react';

const App: () => JSX.Element = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);

  useReduxDevToolsExtension(navigationRef);
  return (
    // <SafeAreaView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef} theme={MyTheme}>
          <NavSelect />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    // </SafeAreaView>
  );
};

export default App;

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};
