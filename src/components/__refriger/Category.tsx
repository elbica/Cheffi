import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ChipButton, IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import categoryData from '../../assets/data/ingreCategory';
import { theme, vh, vw } from '../../assets/styles/theme';
import styled, { css } from 'styled-components/native';
import { isOneDepth, mapWithCategory } from '../../api';
import { CheckBox } from '../__addIngredient/AddIngredient';

const mainCategory = Object.keys(categoryData) as MainCategory[];
const ingredient = Object.values(categoryData).reduce(
  (acc, cur) => ({ ...acc, ...cur }),
  {},
) as { [key: string]: string[] };
const subCategory: { [key: string]: string[] } = mainCategory.reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: isOneDepth(cur)
      ? Object.values(categoryData[cur])
      : Object.keys(categoryData[cur]),
  }),
  {},
);

export const MainCategory = React.memo(
  ({ setCategory, notAll, selectCategory, recommend }: MainCategoryProps) => {
    const changeCategory: MainCategory[] = recommend
      ? ['검색', '추천', ...mainCategory]
      : !notAll
      ? ['전체', ...mainCategory]
      : [...mainCategory];
    return (
      <MainCategoryWrap>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {changeCategory.map((category, idx) => (
            <MainCategoryButtonWrap
              activeOpacity={0.75}
              onPress={() => setCategory(category, 'main')}
              select={category === selectCategory}
              key={idx}>
              <Fonts
                padH="15px"
                padV="8px"
                size="mediumLarge"
                children={category}
                bold={category === selectCategory}
                color={category === selectCategory ? 'carrot' : 'tableBlack'}
              />
            </MainCategoryButtonWrap>
          ))}
        </ScrollView>
      </MainCategoryWrap>
    );
  },
);

export const SubCategory = ({
  setCategory,
  selectCategory,
}: SubCategoryProps) => {
  return (
    <HeightWrap>
      <SubCategoryWrap showsVerticalScrollIndicator={false}>
        {subCategory[selectCategory].map((category, idx) => (
          <SubCategoryButton
            key={idx}
            children={category}
            onPress={() => setCategory(category as MainCategory, 'sub')}
            last={idx === subCategory[selectCategory].length - 1 ? true : false}
          />
        ))}
      </SubCategoryWrap>
    </HeightWrap>
  );
};

export const ContentCategory = ({
  pickCategory,
  handleAdd,
  ingredientSet,
  handleAllAdd,
  handleAllDelete,
}: ContentCategoryProps) => {
  const ingredients = isOneDepth(pickCategory.main)
    ? subCategory[pickCategory.main]
    : pickCategory.sub
    ? ingredient[pickCategory.sub]
    : null;
  const calculContent = () =>
    ingredients?.map(ingre => (
      <IngredientButton
        category={pickCategory.main}
        key={ingre}
        children={ingre}
        isPick={ingredientSet.has(ingre)}
        onPress={handleAdd}
        init
      />
    ));

  return (
    <>
      {ingredients && (
        <CheckBox
          handleAllAdd={handleAllAdd}
          handleAllDelete={handleAllDelete}
          ingredients={mapWithCategory(ingredients)}
        />
      )}
      <ContentCategoryWrap>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}>
          {calculContent()}
        </ScrollView>
      </ContentCategoryWrap>
    </>
  );
};

interface MainCategoryProps {
  recommend?: boolean;
  setCategory:
    | React.Dispatch<React.SetStateAction<MainCategory>>
    | ((param: string, key: 'main' | 'sub') => void);
  notAll?: boolean;
  selectCategory: MainCategory;
}
interface SubCategoryProps extends MainCategoryProps {
  selectCategory: MainCategory;
  setCategory:
    | React.Dispatch<React.SetStateAction<MainCategory>>
    | ((param: string, key: 'main' | 'sub') => void);
}
interface ContentCategoryProps {
  pickCategory: {
    main: MainCategory;
    sub: string | null;
  };
  handleAdd: (ingredient: string, title: MainCategory) => void;
  ingredientSet: Map<string, MainCategory>;
  handleAllAdd: Function;
  handleAllDelete: Function;
}

const MainCategoryButtonWrap = styled.TouchableOpacity<{ select: boolean }>`
  ${({ select }) =>
    select
      ? css`
          border-bottom-color: ${theme.color['carrot']};
          border-bottom-width: 4px;
        `
      : css`
          border-bottom-color: ${theme.color['tableGray'] + '33'};
          border-bottom-width: 2px;
        `}
`;

const ContentCategoryWrap = styled.View`
  height: auto;
  width: 100%;
  flex-wrap: wrap;
`;

const HeightWrap = styled.View`
  height: auto;
  position: absolute;
  width: 100%;
  align-self: flex-start;
`;

const MainCategoryWrap = styled.View`
  width: ${100 * vw}px;
  align-self: center;
  height: auto;
  /* margin-bottom: ${1.5 * vh}px; */
`;

const SubCategoryWrap = styled.ScrollView`
  width: 100%;
  height: auto;
  background-color: ${theme.color['tableGray'] + '33'};
  align-self: flex-start;
  /* border-right-color: ${theme.color['tableGray'] + '33'}; */
  /* border-right-width: 2px; */
  padding-top: 5px;
  padding-bottom: ${3 * vh}px;
  border-bottom-left-radius: ${15 * vw}px;
  border-bottom-right-radius: ${15 * vw}px;
`;

const SubCategoryButton = styled(ChipButton)<{ last?: boolean }>`
  border-width: 0px;
  ${({ last }) =>
    !last &&
    css`
      border-bottom-width: 2.2px;
      border-bottom-color: white;
    `}
  width: 100%;
  align-self: center;
  /* height: auto; */
  background-color: transparent;
`;
