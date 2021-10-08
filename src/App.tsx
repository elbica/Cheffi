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
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
export const queryClient = new QueryClient();

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
  /**
   * @todo
   * data fetch 해서 redux에 저장하기
   */
  React.useEffect(() => {
    SplashScreen.show();

    console.log('🎩splash image');

    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);
  return (
    // <SafeAreaView style={{flex: 1}}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef} theme={MyTheme}>
          <QueryClientProvider client={queryClient}>
            <NavSelect />
          </QueryClientProvider>
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
