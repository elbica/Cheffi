import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../assets/styles/theme';
import IntroNav from './IntroNav';
import MainNav from './MainNav';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { QueryClient, QueryClientProvider } from 'react-query';
export const queryClient = new QueryClient();

const NavSelect: () => JSX.Element = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {Platform.OS === 'android' ? (
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="transparent"
          />
        ) : null}
        {isLogin ? <MainNav /> : <IntroNav />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default NavSelect;
