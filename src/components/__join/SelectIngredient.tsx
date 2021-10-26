import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { getMainCategory } from '../../api';
import { MOCK_RECOMMEND_INGRE } from '../../assets/data/mockRecipeData';
import { Section, theme, vh } from '../../assets/styles/theme';
import { useIngredientSearch } from '../../hooks/useSearch';
import { formSet } from '../../redux/modules';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import { NextArrow } from '../elements/Images';

import { SearchInput } from '../elements/Inputs';

/**
 * @description
 * 기존 form 코드가 난해해서..
 * 따로 form redux에 저장하고, 데이터를 보낼 때 따로 처리한다.
 */

type FormCategory = '추천' | '검색결과';
const recommendIngre = MOCK_RECOMMEND_INGRE.map(ingre => ingre.name);
export default function SelectIngredient() {
  const { results, onChangeText } = useIngredientSearch();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [category, setCategory] = useState<FormCategory>('추천');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleCategory = useCallback(
    (category: FormCategory) => {
      setCategory(category);
    },
    [results],
  );
  const handleText = useCallback(
    (text: string) => {
      if (category !== '검색결과') {
        setCategory('검색결과');
      }
      onChangeText(text);
    },
    [category, results],
  );

  const handleToggle = useCallback((ingredient: string) => {
    setIngredients(state =>
      state.includes(ingredient)
        ? state.filter(ingre => ingre !== ingredient)
        : [...state, ingredient],
    );
  }, []);
  const calculPick = useCallback(
    (ingredient: string) => ingredients.includes(ingredient),
    [ingredients],
  );
  const handleNext = useCallback(() => {
    dispatch(formSet({ ingredients }));
    navigation.navigate('join5');
  }, [ingredients]);
  return (
    <Section flexNumber="7" width="85%" margins="0 auto">
      <Section justify="flex-start">
        <Fonts
          size="large"
          color="tableBlack"
          padV="4%"
          center
          lineHeight="xlarge">
          가지고 있는 재료가 있으신가요?
        </Fonts>
        <SearchInput onChangeText={handleText} />
        <FormCategory category={category} setCategory={handleCategory} />
        <SearchResultWrap>
          {category === '검색결과'
            ? results?.slice(0, 15).map(result => {
                const ingredient = {
                  category: getMainCategory(result),
                  name: result,
                };
                return (
                  <IngredientButton
                    children={ingredient.name}
                    category={ingredient.category}
                    onPress={handleToggle}
                    key={result}
                    init
                    isPick={calculPick(ingredient.name)}
                  />
                );
              })
            : recommendIngre.map(result => {
                const ingredient = {
                  category: getMainCategory(result),
                  name: result,
                };
                return (
                  <IngredientButton
                    children={ingredient.name}
                    category={ingredient.category}
                    onPress={handleToggle}
                    key={result}
                    init
                    isPick={calculPick(ingredient.name)}
                  />
                );
              })}
        </SearchResultWrap>
      </Section>
      <Section row justify="flex-end" flexNumber="0.2">
        <NextSubmit onPress={handleNext}>
          <Fonts children="다음" padH="14px" />
          <NextArrow />
        </NextSubmit>
      </Section>
    </Section>
  );
}

const FormCategory = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: Function;
}) => {
  return (
    <FormCategoryWrap>
      <FormCategoryButton
        select={category === '추천'}
        onPress={() => setCategory('추천')}>
        <Fonts
          children="추천"
          size="mediumLarge"
          padV="5px"
          color={category === '추천' ? 'carrot' : 'tableBlack'}
        />
      </FormCategoryButton>
      <FormCategoryButton
        select={category === '검색결과'}
        onPress={() => setCategory('검색결과')}>
        <Fonts
          size="mediumLarge"
          padV="5px"
          children="검색결과"
          color={category === '검색결과' ? 'carrot' : 'tableBlack'}
        />
      </FormCategoryButton>
    </FormCategoryWrap>
  );
};

const SearchResultWrap = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;
  padding-top: ${1.5 * vh}px;
  left: -5px;
`;
const NextSubmit = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  right: 4px;
  background-color: ${theme.color.bgColor};
  border-radius: 10px;
  top: -7px;
`;
const FormCategoryWrap = styled.View`
  flex-direction: row;
  width: 70%;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: flex-start;
  margin: ${1.5 * vh}px 0px;
`;
const FormCategoryButton = styled.TouchableOpacity<{ select: boolean }>`
  border-bottom-width: 4px;
  width: auto;
  padding: 0 20px;
  justify-content: center;
  align-items: center;

  ${({ select }) =>
    select
      ? css`
          border-bottom-color: ${theme.color.carrot};
        `
      : css`
          border-bottom-color: transparent;
        `}
`;
