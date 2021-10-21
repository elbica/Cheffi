import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import styled from 'styled-components/native';
import { theme, vh, vw } from '../../assets/styles/theme';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';

export const AddModal = React.memo(
  ({ ingredients, handleDelete, number, onPress }: AddModalProps) => {
    const modalizeRef = useRef<Modalize>(null);
    return (
      <>
        <ButtonsWrap>
          <CarrotButton onPress={() => modalizeRef.current?.open()}>
            <Fonts children={`${number}개 선택`} color="white" size="large" />
          </CarrotButton>
          <VegetableButton onPress={() => onPress()}>
            <Fonts children="재료 추가 하기" color="white" size="large" />
          </VegetableButton>
        </ButtonsWrap>
        <Modalize
          ref={modalizeRef}
          handlePosition="inside"
          handleStyle={s.handleStyle}
          overlayStyle={s.overlayStyle}
          scrollViewProps={{ contentContainerStyle: { height: 'auto' } }}
          modalStyle={s.content__modal}
          adjustToContentHeight>
          <CenterWrap>
            {number > 0 ? (
              <IngredientsWrap>
                {ingredients.map(ingredient => (
                  <IngredientButton
                    key={ingredient.name}
                    chip
                    children={ingredient.name}
                    category={ingredient.category}
                    onPress={handleDelete}
                  />
                ))}
              </IngredientsWrap>
            ) : (
              <FontsWrap>
                <Fonts
                  children="재료를 추가해 보세요!"
                  color="tableGray"
                  size="large"
                  center
                />
              </FontsWrap>
            )}

            <ButtonsWrap>
              <VegetableButton onPress={() => onPress()}>
                <Fonts children="재료 추가 하기" color="white" size="large" />
              </VegetableButton>
            </ButtonsWrap>
          </CenterWrap>
        </Modalize>
      </>
    );
  },
);
const s = StyleSheet.create({
  content__modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    width: 100 * vw,
    height: 'auto',
    elevation: 4,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleStyle: {
    width: 30 * vw,
  },
  overlayStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 100 * vw,
    height: 100 * vh,
    top: -40,
    left: -20,
  },
});

const CenterWrap = styled.View`
  height: auto;
  justify-content: center;
  align-items: center;
`;

const IngredientsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  padding: 15px;
  padding-top: ${4 * vh}px;
  padding-bottom: ${9 * vh}px;
`;
const FontsWrap = styled.View`
  height: ${25 * vh}px;
  width: 100%;
  align-self: center;
  justify-content: center;
  top: ${-3 * vh}px;
`;
const ButtonsWrap = styled.View`
  flex-direction: row;
  height: ${8 * vh}px;
  align-self: center;
  width: ${100 * vw}px;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  z-index: 10;
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
interface AddModalProps {
  number: number;
  onPress: Function;
}

interface AddModalProps {
  ingredients: Ingredient[];
  handleDelete: Function;
}
