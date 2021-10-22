import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {
  addIngreToRefriger,
  getMainCategory,
  isOneDepth,
  mapWithCategory,
} from '../../api';
import { vh, vw } from '../../assets/styles/theme';
import { useModifyIngredient } from '../../hooks/useIngredient';
import { useRecipeNumber, useRecommendIngres } from '../../hooks/useRecipe';
import { useCommonIngredient } from '../../hooks/useRedux';
import { useIngredientSearch } from '../../hooks/useSearch';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import { CarrotCheck, GrayCheck } from '../elements/Images';
import { SearchInput } from '../elements/Inputs';
import { PossibleRecipe } from '../elements/Recipe';
import {
  ContentCategory,
  MainCategory,
  SubCategory,
} from '../__refriger/Category';
import { IngreButtons } from '../__refriger/RecommendIngre';
import { AddModal } from './AddModal';

const mapToIngredients = (target: Map<string, MainCategory>) => {
  let ingreState: Ingredient[] = [];
  target.forEach((value, key) => {
    ingreState = [...ingreState, { name: key, category: value }];
  });
  return ingreState;
};

export const AddIngredient = () => {
  const { results, onChangeText } = useIngredientSearch();
  const { saveIngredient } = useModifyIngredient();
  const ingre = useCommonIngredient();
  const { data: recommendIngres } = useRecommendIngres();
  const { category: init } = useRoute<AddIngredientRouteProp>().params;
  const navigation = useNavigation();
  const [category, setCategory] = useState<CategoryState>({
    main: init,
    sub: null,
  });
  const [pickIngre, setPickIngre] = useState<Map<string, MainCategory>>(
    new Map(),
  );
  const computedIngre = mapToIngredients(pickIngre);
  const queryRefriger = addIngreToRefriger(computedIngre, ingre);
  const { data: number } = useRecipeNumber(queryRefriger);

  const oneDepth = useMemo(() => isOneDepth(category.main), [category]);
  const handleCategory = useCallback((param: string, key: 'main' | 'sub') => {
    setCategory(prev =>
      key === 'sub'
        ? { ...prev, [key]: param }
        : {
            main: param as MainCategory,
            sub: null,
          },
    );
  }, []);

  const handleSave = useCallback(() => {
    saveIngredient(queryRefriger);
    navigation.goBack();
  }, [saveIngredient]);

  const handleChangeText = useCallback((text: string) => {
    onChangeText(text);
  }, []);

  const handleAdd = useCallback((ingredient: string, title: MainCategory) => {
    setPickIngre(state => {
      const newState = new Map(state);
      // console.log(newState);
      newState.has(ingredient)
        ? newState.delete(ingredient)
        : newState.set(ingredient, title);
      return newState;
    });
  }, []);

  const handleAllAdd = useCallback((ingredients: Ingredient[]) => {
    setPickIngre(state => {
      const newState = new Map(state);
      ingredients.map(ingredient => {
        newState.set(ingredient.name, ingredient.category);
      });
      return newState;
    });
  }, []);
  const handleAllDelete = useCallback((ingredients: Ingredient[]) => {
    setPickIngre(state => {
      const newState = new Map(state);
      ingredients.map(ingredient => {
        newState.delete(ingredient.name);
      });
      return newState;
    });
  }, []);

  const calculPick = useCallback(
    (ingredient: Ingredient) => pickIngre.has(ingredient.name),
    [pickIngre],
  );

  return (
    <AddIngredientWrap>
      {category.main === '검색' ? (
        <SearchInput onChangeText={handleChangeText} />
      ) : (
        <PossibleRecipe number={number} />
      )}
      <MainCategory
        setCategory={handleCategory}
        selectCategory={category.main}
        recommend
      />
      {category.main === '검색' ? (
        <>
          {results.length > 0 && (
            <CheckBox
              handleAllAdd={handleAllAdd}
              handleAllDelete={handleAllDelete}
              ingredients={mapWithCategory(results)}
            />
          )}
          <SearchResultWrap>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>
              {results?.map(result => {
                const ingredient = {
                  category: getMainCategory(result),
                  name: result,
                };
                return (
                  <IngredientButton
                    children={ingredient.name}
                    category={ingredient.category}
                    onPress={handleAdd}
                    init
                    key={result}
                    isPick={calculPick(ingredient)}
                  />
                );
              })}
            </ScrollView>
          </SearchResultWrap>
        </>
      ) : category.main === '추천' ? (
        <>
          <CheckBox
            handleAllAdd={handleAllAdd}
            handleAllDelete={handleAllDelete}
            ingredients={recommendIngres}
          />
          <IngreButtons
            onPress={handleAdd}
            ingredients={recommendIngres}
            calculPick={calculPick}
          />
        </>
      ) : oneDepth ? (
        <ContentCategory
          pickCategory={category}
          handleAdd={handleAdd}
          ingredientSet={pickIngre}
          handleAllAdd={handleAllAdd}
          handleAllDelete={handleAllDelete}
        />
      ) : (
        <CategoryWrap>
          <WrapHelper>
            <SubCategory
              setCategory={handleCategory}
              selectCategory={category.main}
            />
          </WrapHelper>
          <ContentWrapHelper>
            <ContentCategory
              pickCategory={category}
              handleAdd={handleAdd}
              ingredientSet={pickIngre}
              handleAllAdd={handleAllAdd}
              handleAllDelete={handleAllDelete}
            />
          </ContentWrapHelper>
        </CategoryWrap>
      )}
      <AddModal
        ingredients={computedIngre}
        handleDelete={handleAdd}
        onPress={handleSave}
        number={pickIngre.size}
      />
    </AddIngredientWrap>
  );
};

export const CheckBox = ({
  handleAllAdd,
  handleAllDelete,
  ingredients = [],
}: CheckBoxProps) => {
  return (
    <CheckBoxWrap>
      <CheckButton onPress={() => handleAllAdd(ingredients)}>
        <CarrotCheck />
        <Fonts children="전체 선택" padH="8px" />
      </CheckButton>
      <CheckButton onPress={() => handleAllDelete(ingredients)}>
        <GrayCheck />
        <Fonts children="전체 해제" padH="8px" />
      </CheckButton>
    </CheckBoxWrap>
  );
};

const AddIngredientWrap = styled.View`
  height: 100%;
  position: relative;
`;

const CheckButton = styled.TouchableOpacity`
  flex-direction: row;
  width: auto;
  align-items: center;
  margin-right: ${6 * vw}px;
`;

const WrapHelper = styled.View`
  position: relative;
  width: ${33 * vw}px;
  left: ${-5 * vw}px;
`;
const ContentWrapHelper = styled.View`
  width: ${67 * vw}px;
  padding-left: 10px;
  left: ${-5 * vw}px;
`;
const CategoryWrap = styled.View`
  flex-direction: row;
  position: relative;
  height: 100%;
  width: 100%;
`;
const CheckBoxWrap = styled.View`
  flex-direction: row;
  width: auto;
  margin-top: ${2.5 * vh}px;
  margin-bottom: ${2.5 * vh}px;
  margin-left: ${2.5 * vw}px;
`;

const SearchResultWrap = styled.View`
  /* margin-top: ${1.5 * vh}px; */
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  flex-direction: row;
`;

interface CategoryState {
  main: MainCategory;
  sub: string | null;
}

interface CheckBoxProps {
  handleAllAdd: Function;
  handleAllDelete: Function;
  ingredients?: Ingredient[];
}
