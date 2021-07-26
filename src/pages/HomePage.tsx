import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {TouchOpacity} from '../components/PageMove';
import {AppWrap, Font, Section} from '../assets/styles/theme';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import LinkButton from '../components/Buttons';

const HomeWrap = styled(AppWrap)`
  flex: 8;
`;

export default function HomePage(props) {
  console.log(props);
  const recipeNumber = 5;
  const recommendRecipes = [
    {
      title: 'test1',
      etc: 'asdf1',
      goal: 'recipe1',
    },
    {
      title: 'test2',
      etc: 'asdf2',
      goal: 'recipe2',
    },
  ];
  const hotRecipes = [
    {
      title: 'hot1',
      etc: 'asdf1',
      goal: 'recipe1',
    },
    {
      title: 'hot2',
      etc: 'asdf2',
      goal: 'recipe2',
    },
    {
      title: 'hot3',
      etc: 'asdf2',
      goal: 'recipe2',
    },
  ];
  return (
    <HomeWrap>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Section
          flexNumber={1}
          background="orange"
          // row={true}
          className="RefrigerWrap">
          <Section flexNumber={3} row justify="space-between">
            <LinkButton
              title="냉장고 관리"
              onPress={() => props.navigation.jumpTo('내 냉장고')}
              width="29%"
              height="95%"
            />
            <LinkButton
              title={recipeNumber + '개의 레시피를 만들 수 있어요!'}
              onPress={() => props.navigation.jumpTo('추천레시피')}
              width="69%"
              height="95%"
            />
          </Section>
          {/** 냉장고 재료가 없어야 한다. 따로 prop 전달해서 빈 냉장고 만들어야 할듯 */}
          <Section flexNumber={2} row>
            <LinkButton
              title="원하는 재료로 검색해 봐요!"
              onPress={() => props.navigation.jumpTo('내 냉장고')}
              width="100%"
              height="100%"
            />
          </Section>
        </Section>
        <Section flexNumber={2} background="yellow" className="RecommendWrap">
          <Font size="large">나를 위한 추천 레시피</Font>
          {/* <Section flexNumber={1} background="blue">
          </Section> */}
          <Section
            flexNumber={4}
            background="yellow"
            row
            justify="space-between">
            {recommendRecipes.map((recipe, idx) => (
              <LinkButton
                key={idx}
                title={recipe.title}
                onPress={() => props.navigation.navigate('refrigerator')}
                width={96 / recommendRecipes.length + '%'}
                height="98%"
              />
            ))}
          </Section>
          <Section flexNumber={3}>
            <LinkButton
              title="재료 광고"
              onPress={() => props.navigation.navigate('refrigerator')}
              width="100%"
              height="98%"
            />
          </Section>
        </Section>
        <Section flexNumber={1} background="green" className="HotWrap">
          <Font size="large">오늘의 레시피</Font>
          <Section
            flexNumber={1}
            background="black"
            row
            justify="space-between">
            {hotRecipes.map((recipe, idx) => (
              <LinkButton
                key={idx}
                title={recipe.title}
                onPress={() => props.navigation.navigate('refrigerator')}
                width="100%"
                height="70%"
                margin="3px 0"
              />
            ))}
          </Section>
        </Section>
      </ScrollView>
    </HomeWrap>
  );
}
