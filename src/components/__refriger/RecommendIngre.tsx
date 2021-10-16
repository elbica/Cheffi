import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';
import { MOCK_RECOMMEND_INGRE } from '../../assets/data/mockRecipeData';
import { emptyRefriger } from '../../assets/data/mockUserData';
import { theme, vh } from '../../assets/styles/theme';
import { useRecipeNumber } from '../../hooks/useRecipe';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';

export const RecommendIngre = ({ save }: RecommendIngreProps) => {
  const [recommends, setRecommends] = useState<Ingredient[]>([]);
  const convertRefriger = convertToRefriger(recommends);
  const { data } = useRecipeNumber(convertRefriger);
  const handleIngredient = useCallback(
    (ingredient: Ingredient) => {
      const { name } = ingredient;
      const isInclude = recommends.find(item => item.name === name);
      if (isInclude)
        setRecommends(recommends.filter(item => item.name !== name));
      else setRecommends([...recommends, ingredient]);
    },
    [recommends],
  );
  const handleRefriger = useCallback(() => {
    save(convertRefriger, data as number);
    setRecommends([]);
  }, [data, convertRefriger]);

  return (
    <RecommendIngreWrap>
      <Fonts children="추천 재료" size="large" padV={`${2.7 * vh}px`} />
      <IngreButtons onPress={handleIngredient} />
      <RecommendButton onPress={handleRefriger} number={recommends.length} />
    </RecommendIngreWrap>
  );
};

const IngreButtons = ({ onPress }: IngreButtonsProps) => {
  return (
    <IngredientWrap>
      {MOCK_RECOMMEND_INGRE.map(ingredient => (
        <IngredientButton
          children={ingredient.name}
          key={ingredient.name}
          category={ingredient.category}
          onPress={onPress}
        />
      ))}
    </IngredientWrap>
  );
};

const RecommendButton = ({ number, onPress }: RecomBtnProps) => {
  return (
    <NumberButtonWrap onPress={() => onPress()}>
      <Fonts children={`${number}개 재료 추가`} color="white" size="large" />
    </NumberButtonWrap>
  );
};

const convertToRefriger = (ingredients: Ingredient[]) => {
  /**
   * object.assign, spread syntax는 얕은 복사이다.
   */
  let ret = JSON.parse(JSON.stringify(emptyRefriger)) as Refriger;
  ingredients.map(ingredient => {
    const isExist = ret.findIndex(
      refriger => refriger.title === ingredient.category,
    );
    if (isExist === -1) {
      ret.push({ title: ingredient.category, data: [ingredient.name] });
    } else {
      if (!ret[isExist].data.includes(ingredient.name))
        ret[isExist].data.push(ingredient.name);
    }
  });
  return ret;
};

const NumberButtonWrap = styled.TouchableOpacity`
  width: 100%;
  height: ${6 * vh}px;
  border-radius: 10px;
  background-color: ${theme.color['carrot']};
  justify-content: center;
  align-items: center;
  margin-top: ${2 * vh}px;
`;

const RecommendIngreWrap = styled.View`
  height: auto;
  width: 100%;
`;
const IngredientWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  /* background-color: green; */
  width: 102%;
  align-self: center;
`;
interface RecommendIngreProps {
  save: Function;
}
interface RecomBtnProps {
  number: number;
  onPress: Function;
}

interface IngreButtonsProps {
  onPress(ev: any): void;
}
