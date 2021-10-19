import { useRoute } from '@react-navigation/core';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { getMainCategory, isOneDepth } from '../../api';
import { MOCK_ADD_INGRE } from '../../assets/data/mockRecipeData';
import { vw } from '../../assets/styles/theme';
import { useModifyIngredient } from '../../hooks/useIngredient';
import { useCommonIngredient } from '../../hooks/useRedux';
import { useIngredientSearch } from '../../hooks/useSearch';
import { IngredientButton } from '../elements/Buttons';
import { SearchInput, SearchResult } from '../elements/Inputs';
import {
  ContentCategory,
  MainCategory,
  SubCategory,
} from '../__refriger/Category';
import { IngreButtons } from '../__refriger/RecommendIngre';

export const AddIngredient = () => {
  const { results, mapWithCategory, onChangeText } = useIngredientSearch();
  // const {pushIngredient, refriger} = useModifyIngredient()
  // const ingre = useCommonIngredient();
  const { category: init } = useRoute<AddIngredientRouteProp>().params;

  const [category, setCategory] = useState<CategoryState>({
    main: init,
    sub: null,
  });
  const [pickIngre, setPickIngre] = useState<Map<string, MainCategory>>(
    new Map(),
  );

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

  // console.log(results);
  const handleChangeText = useCallback((text: string) => {
    onChangeText(text);
    setCategory({ main: '검색 결과', sub: null });
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

  const calculPick = useCallback(
    (ingredient: Ingredient) => pickIngre.has(ingredient.name),
    [pickIngre],
  );

  return (
    <>
      <SearchInput onChangeText={handleChangeText} />
      <MainCategory
        setCategory={handleCategory}
        selectCategory={category.main}
        recommend
      />
      {category.main === '검색 결과' ? (
        <SearchResultWrap>
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
        </SearchResultWrap>
      ) : category.main === '추천' ? (
        <IngreButtons
          onPress={handleAdd}
          ingredients={MOCK_ADD_INGRE}
          calculPick={calculPick}
        />
      ) : oneDepth ? (
        <ContentCategory
          pickCategory={category}
          handleAdd={handleAdd}
          ingredientSet={pickIngre}
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
            />
          </ContentWrapHelper>
        </CategoryWrap>
      )}
    </>
  );
};

interface CategoryState {
  main: MainCategory;
  sub: string | null;
}
const WrapHelper = styled.View`
  position: relative;
  width: ${33 * vw}px;
  left: ${-5 * vw}px;
`;
const ContentWrapHelper = styled.View`
  width: ${67 * vw}px;
  padding: 10px;
  left: ${-5 * vw}px;
`;
const CategoryWrap = styled.View`
  flex-direction: row;
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchResultWrap = styled.View`
  /* background-color: red; */
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  flex-direction: row;
`;
