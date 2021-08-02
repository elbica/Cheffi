import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './assets/styles/theme';
import IntroNav from './navigators/IntroNav';
import MainNav from './navigators/MainNav';
import {useSelector} from 'react-redux';
import {RootState} from './redux/modules';

const NavSelect: () => JSX.Element = () => {
  const {isLogin} = useSelector((state: RootState) => state.auth);
  /*
  useEffect(() => {
    ///유저 로그인 처리
    //async storage에 토큰 저장되어 있으면 login true
    //없을 경우 IntroNav로 이동해 회원가입/로그인 처리
    let userToken;
    const fetchUserToken = async () => {
      userToken = await getItem();
      if (userToken) {
        dispatch(userLogin('sohee'));
      } else {
        console.log('app 로그아웃이다.');
      }
    };
    fetchUserToken();
  }, []);*/
  return (
    <ThemeProvider theme={theme}>
      {Platform.OS === 'android' ? (
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
      ) : null}
      {isLogin ? <MainNav /> : <IntroNav />}
    </ThemeProvider>
  );
};

export default NavSelect;
