import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';
import { isAndroid, theme, vh, vw } from '../../assets/styles/theme';
import { IngredientButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import Modal from 'react-native-modal';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const AddModal = React.memo(
  ({ ingredients, handleDelete, number, onPress }: AddModalProps) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <>
        <ButtonsWrap>
          <CarrotButton onPress={() => setIsVisible(true)}>
            <Fonts children={`${number}개 선택`} color="white" size="large" />
          </CarrotButton>
          <VegetableButton onPress={() => onPress()}>
            <Fonts children="재료 추가 하기" color="white" size="large" />
          </VegetableButton>
        </ButtonsWrap>
        <Modal
          isVisible={isVisible}
          backdropOpacity={0.3}
          propagateSwipe
          onBackdropPress={() => setIsVisible(false)}
          onSwipeComplete={() => setIsVisible(false)}
          style={s.content__modal}
          swipeDirection="down">
          <CenterWrap>
            <View style={s.header} />
            {number > 0 ? (
              <IngredientsWrap
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  padding: 15,
                  paddingTop: 20,
                }}>
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

            <ModalButtonsWrap>
              <VegetableButton onPress={() => onPress()}>
                <Fonts children="재료 추가 하기" color="white" size="large" />
              </VegetableButton>
            </ModalButtonsWrap>
          </CenterWrap>
        </Modal>
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
    margin: 0,
    elevation: 4,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    height: 26,
    width: 30 * vw,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    top: -15,
  },
});

const CenterWrap = styled.View`
  height: auto;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const IngredientsWrap = styled.ScrollView`
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: 100%;
  max-height: ${70 * vh}px;
  margin-bottom: ${7 * vh}px;
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
  height: ${7.5 * vh}px;
  align-self: center;
  width: ${100 * vw}px;
  justify-content: center;
  position: absolute;
  bottom: ${isAndroid || !isIphoneX() ? '-62px' : '-80px'};
  z-index: 10;
`;
const ModalButtonsWrap = styled(ButtonsWrap)`
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
interface AddModalProps {
  number: number;
  onPress: Function;
}

interface AddModalProps {
  ingredients: Ingredient[];
  handleDelete: Function;
}
