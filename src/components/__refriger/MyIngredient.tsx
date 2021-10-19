import { useNavigation } from '@react-navigation/core';
import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { theme, vh, vw } from '../../assets/styles/theme';
import { useRecipeNumber } from '../../hooks/useRecipe';
import { useCommonIngredient } from '../../hooks/useRedux';
import { ChipButton, IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import { Plus } from '../elements/Images';
import { MainCategory } from './Category';

/**
 * @todo
 * 2. add ingredient navigation callback 함수 만들기
 */
export const MyIngredient = React.memo(
  ({ init, save, push }: RefacMyIngredientProps) => {
    const ingre = useCommonIngredient();
    const [category, setCategory] = useState<MainCategory>('전체');
    const { data: number } = useRecipeNumber(ingre);
    const navigation = useNavigation();
    const isChange = useMemo(
      () => JSON.stringify(ingre) !== JSON.stringify(init),
      [init, ingre],
    );

    const handleCategory = useCallback(
      (cate: string) => setCategory(cate as MainCategory),
      [],
    );

    const handleRemove = useCallback(
      (name, category) => {
        const newIngredient = ingre.map(cate =>
          cate.title === category
            ? {
                title: category,
                data: cate.data.filter(data => data !== name),
              }
            : cate,
        );
        push(newIngredient);
      },
      [ingre],
    );
    const handleSave = useCallback(
      () => save(ingre, number as number),
      [save, ingre, number],
    );
    const handleCancle = useCallback(() => push(init), [init, push]);
    const handleAddIngredient = useCallback((category: MainCategory) => {
      // console.log('handle ', category);
      navigation.navigate('addIngredient', { category });
    }, []);

    return (
      <Position>
        <NavigationPlusWrap onPress={() => handleAddIngredient('추천')}>
          <NavigationPlus />
        </NavigationPlusWrap>
        <MainCategory
          setCategory={handleCategory}
          notAll={false}
          selectCategory={category}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {ingre.map(
            ({ title, data }) =>
              (title === category || category === '전체') && (
                <IngredientSection
                  category={title}
                  ingredients={data}
                  key={title}
                  handleRemove={handleRemove}
                  handleAddIngredient={handleAddIngredient}
                />
              ),
          )}
        </ScrollView>
        {isChange && (
          <ButtonsWrap>
            <SaveButton color="black" children="취소" onPress={handleCancle} />
            <SaveButton
              color="vegetable"
              children="저장"
              onPress={handleSave}
            />
          </ButtonsWrap>
        )}
      </Position>
    );
  },
);

const IngredientSection = React.memo(
  ({
    category,
    ingredients,
    handleRemove,
    handleAddIngredient,
  }: IngredientSectionProps) => {
    return (
      <IngredientSectionWrap>
        <Fonts children={category} size="mediumLarge" />
        <Divider />
        <PlusWrap onPress={() => handleAddIngredient(category)}>
          <AddIngredientPlus />
        </PlusWrap>

        <IngredientContainer>
          {ingredients.map((ingredient, idx) => (
            <IngredientButton
              category={category}
              onPress={handleRemove}
              key={idx}
              children={ingredient}
              chip
            />
          ))}
          {ingredients.length === 0 && (
            <EmptyMessage children="재료를 추가해 주세요!" color="tableGray" />
          )}
        </IngredientContainer>
      </IngredientSectionWrap>
    );
  },
);

const Position = styled.View`
  position: relative;
  height: 100%;
  /* background-color: red; */
`;

const ButtonsWrap = styled.View`
  height: auto;
  flex-direction: row;
  background-color: white;
  align-self: flex-end;
  width: auto;
  bottom: 10px;
  position: absolute;
`;

const EmptyMessage = styled(Fonts)`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: ${6.8 * vh}px;
`;

const IngredientSectionWrap = styled.View`
  margin-top: ${3 * vh}px;
  position: relative;
`;

const AddIngredientPlus = styled(Plus)`
  width: 22px;
  height: 22px;
  margin-right: 6px;
  opacity: 0.6;
`;

const NavigationPlus = styled(AddIngredientPlus)`
  width: 24px;
  height: 24px;
  opacity: 0.8;
`;

const PlusWrap = styled.TouchableOpacity`
  width: auto;
  height: auto;
  position: absolute;
  align-self: flex-end;
`;

const NavigationPlusWrap = styled(PlusWrap)`
  top: -9%;
`;

const Divider = styled.View`
  width: 100%;
  height: 1.7px;
  background-color: ${theme.color['tableGray'] + '99'};
  margin-top: ${1.5 * vh}px;
`;

const SaveButton = styled(ChipButton)`
  width: ${14 * vw}px;
  /* margin: 3% 5px; */
  /* vertical-align: middle; */
`;
const IngredientContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  flex-wrap: wrap;
  margin-top: ${2.5 * vh}px;
`;

interface RefacMyIngredientProps {
  init: Refriger;
  save(ingredient: Refriger, recipeCount: number): void;
  push(ingredient: Refriger): void;
}

interface IngredientSectionProps {
  category: MainCategory;
  ingredients: string[];
  handleRemove: (title: MainCategory, category: string) => void;
  handleAddIngredient: (category: MainCategory) => void;
}
