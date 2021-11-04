import React, { useState } from 'react';
import styled from 'styled-components/native';
import { OPEN_HAEMUK_URL, OPEN_MANGAE_URL } from '../../../config';
import { defaultShadow } from '../../assets/data/shadow';
import { theme, vh, vw } from '../../assets/styles/theme';
import { useIsRecipeScrap } from '../../hooks/useRedux';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { GreenCheck, ReplaceCheck } from '../elements/Images';
import { RecipeInfo } from '../__recommend/RecipeInfo';
import { OpenLinkModal } from './OpenLinkModal';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { RecipeRating } from './RecipeRating';
import { putUserHistory, putUserScrap } from '../../api';

const DUMMY_TEXT = '레시피 소개 글이 없어요! 😅';

export default function RecipeContent({
  data,
  place,
}: {
  data: RecipeInfo;
  place: number;
}) {
  const [openModal, setOpenModal] = useState(false);
  const url =
    data.platform === 'mangae'
      ? `${OPEN_MANGAE_URL}/${data.recipeid}`
      : data.platform === 'haemuk'
      ? `${OPEN_HAEMUK_URL}/${data.recipeid}`
      : OPEN_MANGAE_URL;

  return (
    <RecipeContentContainer>
      {data && (
        <>
          <RowTitle>
            <TitleContainer>
              <Fonts size="large" children={data.title} bold />
            </TitleContainer>
            <RatingButton recipeid={data.recipeid} place={place} />
          </RowTitle>
          <RecipeInfo
            calories={data.calories}
            time={data.time}
            scrap={data.scrap}
          />
          <Divider />
          <Divs marginV="10px" height="auto">
            <DescriptionWrap>
              <Fonts
                children={data.summary || DUMMY_TEXT}
                color="tableGray"
                padH={`${8 * vw}px`}
              />
              <GotoButton onPress={() => setOpenModal(true)}>
                <Fonts children="레시피 보러가기" size="large" color="white" />
              </GotoButton>
            </DescriptionWrap>
            <Fonts
              children="나를 위한 추천 레시피"
              size="large"
              color="tableBlack"
              padV="10px"
            />
            {data.isReplace && null}

            <RecipeIngredients ingredient={data.ingredient} />
          </Divs>
          <OpenLinkModal
            isOpen={openModal}
            setIsOpen={setOpenModal}
            URL={url}
          />
        </>
      )}
    </RecipeContentContainer>
  );
}

const RecipeIngredients = ({ ingredient }: Pick<RecipeInfo, 'ingredient'>) => {
  return (
    <IngredientContainer>
      {ingredient.map(ingre => {
        const isReplace = ingre.replace && ingre.replace[0].length > 0;
        const computedReplace = (
          isReplace
            ? ingre.replace.reduce(
                (acc, cur) => (cur !== '' ? acc + ', ' + cur : acc),
                '',
              )
            : ingre.replace
        ).slice(1);
        return (
          <IngredientAmountWrap key={ingre.name + ingre.replace}>
            {isReplace ? (
              <Row>
                <Fonts children={ingre.name} />
                <ReplaceCheck />
                <Fonts children={computedReplace} />
                <GreenCheck />
              </Row>
            ) : (
              <Row>
                <Fonts children={ingre.name} />
                <GreenCheck />
              </Row>
            )}
            <Fonts children={ingre.amount} color="tableBlack" />
          </IngredientAmountWrap>
        );
      })}
    </IngredientContainer>
  );
};

const RatingButton = ({
  recipeid,
  place,
}: Pick<RecipeInfo, 'recipeid'> & { place: number }) => {
  const [rating, setRating] = useState(5);
  const [isVisible, setIsVisible] = useState(false);
  const isScrap = useIsRecipeScrap(recipeid);
  const onPress = () => setIsVisible(true);
  const handleCheck = () => {
    putUserHistory(recipeid, place, rating);
    if (isScrap) putUserScrap(recipeid, place, rating);
    setIsVisible(false);
  };

  return (
    <>
      <CompleteCookButtonWrap onPress={onPress}>
        <Fonts children="요리 평가" padH="11px" padV="7px" color="tableGray" />
      </CompleteCookButtonWrap>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.3}
        onSwipeComplete={() => setIsVisible(false)}
        style={s.content__modal}
        swipeDirection="down">
        <PopUp>
          <PopUpTitle>
            <Fonts
              children="🎊  별점을 매겨주세요  🎊"
              color="tableBlack"
              size="mediumLarge"
            />
            <Fonts
              children="레시피 추천의 정확도가 올라가요!"
              color="tableGray"
              size="small"
            />
          </PopUpTitle>
          <RecipeRating setRating={setRating} rating={rating} />
          <PopUpButton>
            <PopUpButtonClose onPress={() => setIsVisible(false)}>
              <Fonts children="다음에.." color="tableGray" />
            </PopUpButtonClose>

            <PopUpButtonCheck onPress={() => handleCheck()}>
              <Fonts children="별점 주기" color="white" />
            </PopUpButtonCheck>
          </PopUpButton>
        </PopUp>
      </Modal>
    </>
  );
};

const s = StyleSheet.create({
  content__modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    margin: 0,
    elevation: 4,
    alignSelf: 'center',
  },
});

const RecipeContentContainer = styled.View`
  width: 86%;
  margin: 0 auto;
  height: auto;
  padding-top: ${3 * vh}px;
`;
const Divider = styled.View`
  height: 1.5px;
  width: 106%;
  margin-top: ${1 * vh}px;
  margin-bottom: ${1 * vh}px;
  align-self: center;
  background-color: ${theme.color['tableGray'] + '70'};
`;

const IngredientContainer = styled.View`
  padding-top: ${1 * vh}px;
  padding-bottom: ${2 * vh}px;
`;
const DescriptionWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  width: auto;
  height: auto;
  align-items: center;
`;
const TitleContainer = styled.View`
  width: ${62 * vw}px;
`;
const RowTitle = styled(Row)`
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
`;
const IngredientAmountWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #dadada;
  padding-top: 12px;
  padding-bottom: 12px;
  margin-bottom: 4px;
`;

const GotoButton = styled(defaultShadow)`
  border-radius: 6px;
  width: 100%;
  height: 50px;
  margin-top: ${3 * vh}px;
  margin-bottom: ${3 * vh}px;
  background-color: ${theme.color.carrot};
  justify-content: center;
  align-items: center;
  shadow-radius: 6px;
`;

const CompleteCookButtonWrap = styled.TouchableOpacity`
  border-width: 1px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  right: ${-2 * vw}px;
  position: absolute;
  border-color: #dadada;
  background-color: white;
`;
const PopUp = styled.View`
  height: ${28 * vh}px;
  width: ${85 * vw}px;
  /* justify-content: center; */
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  padding: 2% 5% 0 5%;
`;

const PopUpTitle = styled.View`
  justify-content: center;
  align-items: center;
  border-bottom-width: 1.2px;
  border-bottom-color: ${theme.color.tableGray + '77'};
  padding-bottom: 10px;
  width: 85%;
`;

const PopUpButton = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  /* background-color: green; */
  height: 40px;
  width: 100%;
`;

const PopUpButtonClose = styled.TouchableOpacity`
  width: 33%;
  height: 100%;
  border-color: #dadada;
  border-width: 1px;
  border-radius: 12px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const PopUpButtonCheck = styled(PopUpButtonClose)`
  background-color: ${theme.color.vegetable};
  border-color: ${theme.color.vegetable};
`;
