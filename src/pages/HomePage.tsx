import React, { useLayoutEffect, useState } from 'react';
import { AppWrap, vh } from '../assets/styles/theme';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import MyRefriger from '../components/__home/MyRefriger';
import ForMe from '../components/__home/ForMe';
import HotRecipes from '../components/__home/HotRecipes';
import { useCommonIngredient, useRefrigerIngredient } from '../hooks/useRedux';
import { emptyRefriger } from '../assets/data/mockUserData';
import { getInitialRecipe } from '../api';
import { useDispatch } from 'react-redux';
import { userRecipeCount, userLogout, setIngredient } from '../redux/modules';
import { ProgressBar } from '../components/elements/Indicators';

const HomeWrap = styled(AppWrap)`
  flex: 1;
  background-color: white;
  /* padding-top: ${14 * vh}px; */
`;

export default function HomePage() {
  const refriger = useRefrigerIngredient();
  const ingredient = useCommonIngredient();
  const dispatch = useDispatch();

  //deep comparision
  const empty = JSON.stringify(refriger) === JSON.stringify(emptyRefriger);

  const [list, setList] = useState<Recipe[]>();
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoaing] = useState(true);
  useLayoutEffect(() => {
    setTimeout(() => setLoaing(false), 4000);

    if (!ingredient.length) {
      dispatch(setIngredient(refriger));
    }
    (async () => {
      /**
       * @description
       * init 함수를 통해
       * 로그인 된 유저의 레시피 개수와 레시피 리스트를 미리 불러온다
       * 레시피 개수는 persist에 저장한다
       *
       * 레시피 개수의 경우 추후 api로 불러오지 않고 persist의 값을 사용하는 방식으로 deprecated 될 수 있다
       */
      const { error, login, number, randomList, recommendRecipe } =
        await getInitialRecipe();
      setList(randomList);
      setRecipe(recommendRecipe);
      if (login) {
        dispatch(userRecipeCount(number));
      } else if (error) {
        console.log('error 발생. 초기화면 이동이 필요합니다.');
        // dispatch(userLogout());
      }
    })();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <ProgressBar />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <HomeWrap>
            <MyRefriger empty={empty} />
            <ForMe recipe={recipe as Recipe} />
            <HotRecipes data={list} />
          </HomeWrap>
        </ScrollView>
      )}
    </>
  );
}
