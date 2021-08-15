import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {TouchOpacity} from '../components/PageMove';
import { AppWrap } from '../assets/styles/theme';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import MyRefriger from '../components/__home/MyRefriger';
import ForMe from '../components/__home/ForMe';
import HotRecipes from '../components/__home/HotRecipes';
import { useRefrigerIngredient } from '../hooks/useRedux';

const HomeWrap = styled(AppWrap)`
  flex: 1;
  background-color: white;
`;

export default function HomePage() {
  //사용자 냉장고 정보 asyncStorage에서 fetch 하기
  //냉장고 재료(상태)
  const empty: boolean = !useRefrigerIngredient().length;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      <HomeWrap>
        <MyRefriger empty={empty} />
        <ForMe />
        <HotRecipes />
      </HomeWrap>
    </ScrollView>
  );
}
