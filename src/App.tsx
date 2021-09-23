/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Provider } from 'react-redux';
import NavSelect from './navigators/NavSelect';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { useRef } from 'react';
import { LogBox } from 'react-native';

/**
 * @description
 * android setTimeout warning
 * 일단 로그를 무시하게 했다
 * 추후 react native 0.65버전으로 업데이트 하면 고쳐질듯
 */
LogBox.ignoreLogs(['Setting a timer for a long period of time']);
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
