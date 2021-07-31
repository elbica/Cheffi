import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {TouchOpacity} from '../components/PageMove';
import {AppWrap} from '../assets/styles/theme';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import MyRefriger from '../components/__home/MyRefriger';
import ForMe from '../components/__home/ForMe';
import HotRecipes from '../components/__home/HotRecipes';

const HomeWrap = styled(AppWrap)`
  flex: 1;
  background-color: white;
`;

export default function HomePage() {
  //사용자 냉장고 정보 asyncStorage에서 fetch 하기
  //냉장고 재료(상태)
  const empty = false;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <HomeWrap>
        <MyRefriger empty={empty} />
        <ForMe />
        <HotRecipes />
      </HomeWrap>
    </ScrollView>
  );
}
