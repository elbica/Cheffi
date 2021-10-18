import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components/native';
import { isOneDepth } from '../../api';
import { MOCK_ADD_INGRE } from '../../assets/data/mockRecipeData';
import { vw } from '../../assets/styles/theme';
import { useModifyIngredient } from '../../hooks/useIngredient';
import { useCommonIngredient } from '../../hooks/useRedux';
import { useIngredientSearch } from '../../hooks/useSearch';
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

  const [category, setCategory] = useState<CategoryState>({
    main: '떡/곡류',
    sub: null,
  });
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

  // const handleAdd = useCallback((ingredient: string, title: MainCategory) => {
  //     const newIngredient = ingre.map(cate =>
  //       cate.title === title
  //         ? {
  //             title,
  //             data: cate.data.includes(ingredient)
  //               ? cate.data
  //               : [...cate.data, ingredient],
  //           }
  //         : { ...cate },
  //     )
  //     pushIngredient(newIngredient)
  // }, [ingre]);

  return (
    <>
      <SearchInput onChangeText={handleChangeText} />
      <MainCategory
        setCategory={handleCategory}
        selectCategory={category.main}
        recommend
      />
      {category.main === '검색 결과' ? (
        <SearchResult results={results} />
      ) : category.main === '추천' ? (
        <IngreButtons onPress={() => {}} ingredients={MOCK_ADD_INGRE} />
      ) : oneDepth ? (
        <ContentCategory
          pickCategory={category}
          setCategory={handleCategory}
          handleAdd={() => {}}
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
              setCategory={handleCategory}
              handleAdd={() => {}}
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
  /* background-color: green; */
  /* padding-right: ${15 * vw}px; */
  padding: 10px;
  left: ${-5 * vw}px;
`;
const CategoryWrap = styled.View`
  flex-direction: row;
  position: relative;
  height: 100%;
  width: 100%;
`;
