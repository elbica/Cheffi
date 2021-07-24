import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {TouchOpacity} from '../components/PageMove';
import {AppWrap, Section} from '../assets/styles/theme';
import styled from 'styled-components/native';
import {Button} from 'react-native';
import LinkButton from '../components/Buttons';

const HomeWrap = styled(AppWrap)`
  flex: 8;
`;

export default function HomePage({navigation}) {
  return (
    <HomeWrap>
      <Section flexNumber={1} background="orange" row>
        <LinkButton
          title="냉장고 관리"
          onPress={() => navigation.navigate('refrigerator')}
          width="50%"
          height="100px"
        />
        <LinkButton
          title="냉장고 관리2"
          onPress={() => navigation.navigate('refrigerator')}
          width="50%"
          height="100px"
        />
        <LinkButton
          title="냉장고 관리3"
          onPress={() => navigation.navigate('refrigerator')}
          width="100%"
          height="50px"
        />
      </Section>
      <Section flexNumber={2} background="yellow" />
      <Section flexNumber={1} background="green" />
      {/* <Section.recommend></Section.recommend>
      <Section.hot></Section.hot> */}
    </HomeWrap>
  );
}
