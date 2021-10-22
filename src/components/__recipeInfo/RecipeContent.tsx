import React, { useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';
import { Colors } from 'styled-components';
import styled, { css } from 'styled-components/native';
import { OPEN_HAEMUK_URL, OPEN_MANGAE_URL } from '../../../config';
import { defaultShadow } from '../../assets/data/shadow';
import { theme, vh, vw } from '../../assets/styles/theme';
import { useIsRecipeComplete } from '../../hooks/useRedux';
import { toggleRecipeComplete } from '../../redux/modules';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { GreenCheck, ReplaceCheck } from '../elements/Images';
import { RecipeInfo } from '../__recommend/RecipeInfo';
import { OpenLinkModal } from './OpenLinkModal';

const DUMMY_TEXT = '레시피 소개 글이 없어요! 😅';

export default function RecipeContent({ data }: { data: RecipeInfo }) {
  const [openModal, setOpenModal] = useState(false);
  let modals = useRef<Modalize>(null).current;
  const url =
    data.platform === 'mangae'
      ? `${OPEN_MANGAE_URL}/${data.recipeid}`
      : data.platform === 'haemuk'
      ? `${OPEN_HAEMUK_URL}/${data.recipeid}`
      : 'https://naver.com';

  return (
    <RecipeContentContainer>
      {data && (
        <>
          <RowTitle>
            <TitleContainer>
              <Fonts size="large" children={data.title} bold />
            </TitleContainer>
            <CompleteCookButton recipeid={data.recipeid} />
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
                children={data.description || DUMMY_TEXT}
                color="tableGray"
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
            // ref={el => (modals = el)}
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
        const isReplace = ingre.replace !== '';
        return (
          <IngredientAmountWrap key={ingre.name}>
            {isReplace ? (
              <Row>
                <Fonts children={ingre.name} />
                <ReplaceCheck />
                <Fonts children={ingre.replace} />
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

const CompleteCookButton = ({ recipeid }: Pick<RecipeInfo, 'recipeid'>) => {
  const isComplete = useIsRecipeComplete(recipeid);
  const dispatch = useDispatch();
  const onPress = () => {
    /**
     * @todo popup 띄워서 별점 준 후 서버로 보내기
     */
    dispatch(toggleRecipeComplete(recipeid));
  };
  const fontColor: Colors = isComplete ? 'white' : 'tableGray';
  return (
    <CompleteCookButtonWrap isComplete={isComplete} onPress={onPress}>
      <Fonts children="요리 완료" padH="11px" padV="7px" color={fontColor} />
    </CompleteCookButtonWrap>
  );
};

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
`;

const CompleteCookButtonWrap = styled.TouchableOpacity<{ isComplete: boolean }>`
  border-width: 1px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  right: ${-2 * vw}px;
  position: absolute;

  ${({ isComplete }) =>
    isComplete
      ? css`
          border-color: ${theme.color.vegetable};
          background-color: ${theme.color.vegetable};
        `
      : css`
          border-color: #dadada;
          background-color: white;
        `}
`;
