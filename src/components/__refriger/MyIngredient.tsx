import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { theme, vh } from '../../assets/styles/theme';
import { useRecipeNumber } from '../../hooks/useRecipe';
import { ChipButton, IngredientButton } from '../elements/Buttons';
import Divs, { RightDivs, RowDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { Plus } from '../elements/Images';
import { MainCategory } from './Category';

/**
 * @flow
 * 냉장고 재료 읽어오기, 저장은 redux persist(async storage)로 관리
 * 재료의 추가, 변경, 삭제 등은 임시 state를 활용
 * 저장을 누르면 redux action 실행
 *
 * redux store에 persist ingredient, temp ingredient 생성
 * 재료를 보여줄 때 persist ingredient를 복사한 temp ingredient를 활용
 *
 * 재료 목록, 변경 페이지 모두 useRedux hook에서 persist ingredient를 가져와
 * temp state에 저장한다.
 *
 * 저장 버튼을 눌러야 temp ingredient에 저장된 내용이 persist에 반영
 *
 *
 */
export default function MyIngredient({
  init,
  save,
  now,
  complete,
  setViewModal,
}: MyIngredientProps) {
  const [ingre, setIngre] = useState<Refriger>(init);

  const [category, setCategory] = useState<MainCategory>('전체');
  const { data: number, isLoading } = useRecipeNumber(ingre);
  useEffect(() => {
    setIngre(now);
  }, [now]);

  const handleRemove = useCallback((title: string, ingredient: string) => {
    setIngre(ing =>
      ing.map(cate =>
        cate.title === title
          ? {
              title: title,
              data: cate.data.filter(data => data !== ingredient),
            }
          : cate,
      ),
    );
  }, []);

  const handleModal = useCallback(() => setViewModal(true), [setViewModal]);
  const handleSave = useCallback(
    () => save(ingre, number as number),
    [save, ingre, number],
  );
  // console.log(now);
  const handleCancle = useCallback(() => {
    complete(init);
    setIngre(init);
  }, [init, complete]);
  const handleCategory = useCallback(
    (cate: string, _?: any) => setCategory(cate as MainCategory),
    [],
  );

  return (
    <>
      <Divs height={`${15 * vh}px`}>
        <ChipButton
          color="citrus"
          // marginV="5%"
          children={
            isLoading ? '계산중..' : `${number} 개의 레시피를 만들 수 있어요!`
          }
        />
        <RowDivs height="auto" marginV="8px">
          <ChipButton color="deepGreen" children="내 냉장고" />
          <AddButton
            color="vegetable"
            children="재료 추가"
            onPress={handleModal}
          />
        </RowDivs>
      </Divs>
      <Divs height={`${53 * vh}px`}>
        <MainCategory setCategory={handleCategory} notAll={false} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {ingre.map(({ title, data }, index) =>
            title === category || category === '전체'
              ? data.length > 0 && (
                  <View key={index}>
                    <Fonts children={title} />
                    <IngredientContainer>
                      {data.map((ingredient, idx) => (
                        <ChipButton
                          onPress={() => handleRemove(title, ingredient)}
                          key={idx}
                          children={ingredient}
                        />
                      ))}
                    </IngredientContainer>
                  </View>
                )
              : null,
          )}
        </ScrollView>
      </Divs>

      <RightDivs height="auto" align>
        <SaveButton color="black" children="취소" onPress={handleCancle} />
        <SaveButton color="vegetable" children="저장" onPress={handleSave} />
      </RightDivs>
    </>
  );
}

interface MyIngredientProps {
  init: Category[];
  now: Category[];
  save(ingredient: Refriger, recipeCount: number): void;
  complete(ingredient: Refriger): void;
  setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddButton = styled(ChipButton)`
  /* align-self: flex-end; */
  width: auto;
`;
const SaveButton = styled(ChipButton)`
  width: 16%;
  margin: 3% 5px;
  /* vertical-align: middle; */
`;
const IngredientContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  flex-wrap: wrap;
  margin-top: ${2.5 * vh}px;
`;

/**
 * const handleSave = useCallback(
    () =>
      save([
        { title: '가공식품', data: ["스팸",'즉석밥','햇반',] },
        { title: '계란/유제품', data: ['계란', '달걀'] },
        { title: '과일류', data: [] },
        { title: '떡/밥/곡류', data: ['밥'] },
        { title: '빵/면/만두류', data: [] },
        {
          title: '채소류',
          data: [
            '당근',
            '양파',
            '쪽파',
            '대파',
            '마늘',
            '김치',
            '배추김치',
            '두부',
            '무',
            '다진마늘',
            '김치',
            '고구마',
            
          ],
        },
        { title: '수산/건어물', data: ['오징어'] },
        { title: '육류', data: [] },
        { title: '음료/주류', data: [] },
        {
          title: '장/양념/소스류',
          data: ['소금', '후추', '설탕', '간장', '고춧가루', '식용유','진간장','올리고당',],
        },
        { title: '초콜릿/과자/견과류', data: [] },
        { title: '향신료/가루류', data: [] },
      ]),
    [save, ingre],
  );
 */

export const RefacMyIngredient = ({ init }: RefacMyIngredientProps) => {
  const [ingre, setIngre] = useState<Refriger>(init);
  const [category, setCategory] = useState<MainCategory>('전체');
  const handleCategory = useCallback(
    (cate: string) => setCategory(cate as MainCategory),
    [],
  );

  return (
    <>
      <MainCategory
        setCategory={handleCategory}
        notAll={false}
        selectCategory={category}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {ingre.map(({ title, data }) =>
          title === category || category === '전체' ? (
            <IngredientSection
              category={title}
              ingredients={data}
              key={title}
            />
          ) : null,
        )}
      </ScrollView>
    </>
  );
};

const IngredientSection = ({
  category,
  ingredients,
}: IngredientSectionProps) => {
  return (
    <IngredientSectionWrap>
      <Fonts children={category} size="mediumLarge" />
      <Divider />
      <PlusWrap>
        <AddIngredientPlus />
      </PlusWrap>

      <IngredientContainer>
        {ingredients.map((ingredient, idx) => (
          <IngredientButton
            category={category}
            onPress={() => {}}
            key={idx}
            children={ingredient}
            chip
          />
        ))}
        {ingredients.length === 0 && (
          <Fonts
            children="재료를 추가해 주세요!"
            color="tableGray"
            padH="30%"
            padV="25px"
          />
        )}
      </IngredientContainer>
    </IngredientSectionWrap>
  );
};

const IngredientSectionWrap = styled.View`
  margin-top: ${2 * vh}px;
  position: relative;
`;

const AddIngredientPlus = styled(Plus)`
  width: 22px;
  height: 22px;
  margin-right: 4px;
`;
const PlusWrap = styled.TouchableOpacity`
  width: auto;
  height: auto;
  position: absolute;
  align-self: flex-end;
`;

const Divider = styled.View`
  width: 100%;
  height: 1.7px;
  background-color: ${theme.color['tableGray'] + '99'};
  margin-top: ${1.5 * vh}px;
`;

interface RefacMyIngredientProps {
  init: Refriger;
}

interface IngredientSectionProps {
  category: MainCategory;
  ingredients: string[];
}
