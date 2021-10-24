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

const HomeWrap = styled(AppWrap)`
  flex: 1;
  background-color: white;
`;

export default function HomePage() {
  const refriger = useRefrigerIngredient();
  const ingredient = useCommonIngredient();
  const dispatch = useDispatch();

  //deep comparision
  const empty = JSON.stringify(refriger) === JSON.stringify(emptyRefriger);

  const [list, setList] = useState<Recipe[]>();
  const [recipe, setRecipe] = useState<Recipe>();
  // const [loading, setLoaing] = useState(true);
  useLayoutEffect(() => {
    // setTimeout(() => setLoaing(false), 4000);

    if (!ingredient.length) {
      dispatch(setIngredient(refriger));
    }
    (async () => {
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
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <HomeWrap>
        <MyRefriger empty={empty} />
        <ForMe recipe={recipe as Recipe} />
        <HotRecipes data={list} />
      </HomeWrap>
    </ScrollView>
  );
}
