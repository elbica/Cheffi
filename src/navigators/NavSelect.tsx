import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '../assets/styles/theme';
import IntroNav from './IntroNav';
import MainNav from './MainNav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/modules';
import { RecipeInit } from '../hooks/useRecipe';
import { userRecipeCount } from '../redux/modules/user';

const NavSelect: () => JSX.Element = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      /**
       * @description
       * init 함수를 통해
       * 로그인 된 유저의 레시피 개수와 레시피 리스트를 미리 불러온다
       * 레시피 개수는 persist에 저장한다
       *
       * 레시피 개수의 경우 추후 api로 불러오지 않고 persist의 값을 사용하는 방식으로 deprecated 될 수 있다
       */
      const { number } = await RecipeInit();
      if (isLogin) {
        dispatch(userRecipeCount(number));
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
