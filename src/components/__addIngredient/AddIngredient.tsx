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
import { MOCK_ADD_INGRE } from '../../assets/data/mockRecipeData';
import { theme, vh, vw } from '../../assets/styles/theme';
import { useModifyIngredient } from '../../hooks/useIngredient';
import { useCommonIngredient } from '../../hooks/useRedux';
import { useIngredientSearch } from '../../hooks/useSearch';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import { CarrotCheck, GrayCheck } from '../elements/Images';
import { SearchInput } from '../elements/Inputs';
import {
  ContentCategory,
  MainCategory,
  SubCategory,
} from '../__refriger/Category';
import { IngreButtons } from '../__refriger/RecommendIngre';

/**
 * @todo
 * MOCK_ADD_INGRE 추후 api로 데이터 받아오기
 */
export const AddIngredient = () => {
  const { results, onChangeText } = useIngredientSearch();
  const { saveIngredient } = useModifyIngredient();
  const ingre = useCommonIngredient();
  const { category: init } = useRoute<AddIngredientRouteProp>().params;
  const navigation = useNavigation();

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

  /**
   * @todo
   * 필요할 시, saveIngredient 함수를 가져와서
   * 바로 냉장고에 저장하도록 한다.
   */
  const handleSave = useCallback(() => {
    const existIngre: Refriger = JSON.parse(JSON.stringify(ingre));
    let ingreState: Ingredient[] = [];
    pickIngre.forEach((value, key) => {
      ingreState = [...ingreState, { name: key, category: value }];
    });
    const newIngre = addIngreToRefriger(ingreState, existIngre);
    saveIngredient(newIngre);

    navigation.goBack();
  }, [saveIngredient, ingre, pickIngre]);
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
      <SearchInput onChangeText={handleChangeText} />
      <MainCategory
        setCategory={handleCategory}
        selectCategory={category.main}
        recommend
      />
      {category.main === '검색 결과' ? (
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
            ingredients={MOCK_ADD_INGRE}
          />
          <IngreButtons
            onPress={handleAdd}
            ingredients={MOCK_ADD_INGRE}
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
      <AddModal number={pickIngre.size} onPress={handleSave} />
    </AddIngredientWrap>
  );
};

const AddModal = React.memo(({ number, onPress }: AddModalProps) => {
  return (
    <ButtonsWrap>
      <CarrotButton>
        <Fonts children={`${number}개 선택`} color="white" size="large" />
      </CarrotButton>
      <VegetableButton onPress={() => onPress()}>
        <Fonts children="재료 추가 하기" color="white" size="large" />
      </VegetableButton>
    </ButtonsWrap>
  );
});

export const CheckBox = ({
  handleAllAdd,
  handleAllDelete,
  ingredients,
}: CheckBoxProps) => {
  return (
    <CheckBoxWrap>
      <CheckButton onPress={() => handleAllAdd(ingredients)}>
        <CarrotCheck />
        <Fonts children="전체 선택" />
      </CheckButton>
      <CheckButton onPress={() => handleAllDelete(ingredients)}>
        <GrayCheck />
        <Fonts children="전체 해제" />
      </CheckButton>
    </CheckBoxWrap>
  );
};

const AddIngredientWrap = styled.View`
  height: 100%;
  position: relative;
`;

const ButtonsWrap = styled.View`
  flex-direction: row;
  height: ${8 * vh}px;
  align-self: center;
  width: ${100 * vw}px;
  justify-content: center;
  position: absolute;
  bottom: 0px;
`;
const CarrotButton = styled.TouchableOpacity`
  background-color: ${theme.color['carrot']};
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const VegetableButton = styled(CarrotButton)`
  background-color: ${theme.color['vegetable']};
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
  /* padding: 10px; */
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

interface AddModalProps {
  number: number;
  onPress: Function;
}
interface CheckBoxProps {
  handleAllAdd: Function;
  handleAllDelete: Function;
  ingredients: Ingredient[];
}
