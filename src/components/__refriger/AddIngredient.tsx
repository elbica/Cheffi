import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { Modal } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Section } from '../../assets/styles/theme';
import { useRecipeNumber } from '../../hooks/useRecipe';
import { ChipButton } from '../elements/Buttons';
import Divs, { RightDivs } from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { ContentCategory, MainCategory, SubCategory } from './Category';

export default React.memo(function AddIngredient({
  init,
  setViewModal,
  complete,
  viewModal,
}: AddIngredientProps) {
  const [ingre, setIngre] = useState<Refriger>(init);
  const [category, setCategory] = useState<CategoryState>({
    main: '떡/곡류',
    sub: null,
  });
  const viewIngre = ingre.map(ing => ing.data).flat();
  const { data: number, isLoading } = useRecipeNumber(ingre);

  const handleCancle = useCallback(() => setIngre(init), [init]);
  const handlePrev = useCallback(
    () => setCategory(prev => ({ ...prev, sub: null })),
    [],
  );
  // console.log(ingre);
  const handleComplete = useCallback(() => complete(ingre), [complete, ingre]);
  const handleCategory = useCallback((param: string, key: 'main' | 'sub') => {
    setCategory(prev => ({ ...prev, [key]: param }));
  }, []);
  const handleRemove = useCallback((ingredient: string) => {
    setIngre(ing =>
      ing.map(cate => ({
        title: cate.title,
        data: cate.data.filter(element => element !== ingredient),
      })),
    );
  }, []);
  const handleAdd = useCallback((ingredient: string, title: MainCategory) => {
    setIngre(ing =>
      ing.map(cate =>
        cate.title === title
          ? {
              title,
              data: cate.data.includes(ingredient)
                ? cate.data
                : [...cate.data, ingredient],
            }
          : { ...cate },
      ),
    );
  }, []);

  useEffect(() => {
    setIngre(init);
  }, [viewModal, init]);

  return (
    <Modal
      animationType="slide"
      visible={viewModal}
      onRequestClose={() => {
        setCategory({
          main: '떡/곡류',
          sub: null,
        });
        setViewModal(false);
      }}>
      <Section background="white" width="88%" margins="0 auto">
        <PrevButton
          children="닫기"
          onPress={() => {
            setViewModal(false);
            setCategory({
              main: '떡/곡류',
              sub: null,
            });
          }}
          color="black"
        />
        <ChipButton
          color="citrus"
          width="100%"
          children={
            isLoading ? '계산중..' : `${number} 개의 레시피를 만들 수 있어요!`
          }
        />
        <RightDivs height="auto" marginV="10px">
          <ChipButton
            color="vegetable"
            onPress={handleCancle}
            children="복구"
          />
          <ChipButton
            color="vegetable"
            onPress={handleComplete}
            children="완료"
          />
        </RightDivs>
        <Divs height="auto">
          <Fonts children="내 냉장고" bold />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={viewIngre}
            renderItem={({ item }) => (
              <ChipButton children={item} onPress={() => handleRemove(item)} />
            )}
            keyExtractor={item => item}
          />
        </Divs>
        {category.sub ? (
          <SubCategory setCategory={handleCategory} pickMain={category.main} />
        ) : (
          <MainCategory setCategory={handleCategory} notAll />
        )}
        <ContentCategory
          handlePrev={handlePrev}
          pickCategory={category}
          setCategory={handleCategory}
          handleAdd={handleAdd}
        />
      </Section>
    </Modal>
  );
});

interface AddIngredientProps {
  init: Refriger;
  complete(ingredient: Refriger): void;
  setViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  viewModal: boolean;
}
interface CategoryState {
  main: MainCategory;
  sub: string | null;
}

const PrevButton = styled(ChipButton)`
  align-self: flex-start;
`;
