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
import { emptyRefriger } from '../assets/data/mockUserData';

const HomeWrap = styled(AppWrap)`
  flex: 1;
  background-color: white;
`;

export default function HomePage() {
  const refriger = useRefrigerIngredient();

  //deep comparision
  const empty = JSON.stringify(refriger) === JSON.stringify(emptyRefriger);

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
