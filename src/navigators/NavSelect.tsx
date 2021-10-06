import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../assets/styles/theme';
import IntroNav from './IntroNav';
import MainNav from './MainNav';
import { useDispatch } from 'react-redux';
import { userRecipeCount } from '../redux/modules/user';
import { useIsLogin } from '../hooks/useRedux';
import { getInitialRecipe } from '../api';
import { userLogout } from '../redux/modules/auth';

const NavSelect: () => JSX.Element = () => {
  const { isLogin } = useIsLogin();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      if (isLogin) {
        /**
         * @description
         * init 함수를 통해
         * 로그인 된 유저의 레시피 개수와 레시피 리스트를 미리 불러온다
         * 레시피 개수는 persist에 저장한다
         *
         * 레시피 개수의 경우 추후 api로 불러오지 않고 persist의 값을 사용하는 방식으로 deprecated 될 수 있다
         */
        const { error, login, number } = await getInitialRecipe();
        if (login) {
          dispatch(userRecipeCount(number));
        } else if (error) {
          console.log('error 발생. 초기화면 이동이 필요합니다.');
          dispatch(userLogout());
        }
      }
    })();
  }, [dispatch, isLogin]);
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
