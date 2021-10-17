import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageStyle, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { homeIcons } from '../../assets/icons/icons';
import { Section, vh, vw } from '../../assets/styles/theme';
import { useRecipeCount } from '../../hooks/useRedux';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import { CenterTouchOpacity } from '../layout/PageMoveLayout';

const TouchIconAndText = ({
  flexNumber,
  imageName,
  text,
  onPress,
}: TouchIconTextProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Section row flexNumber={flexNumber} justify="flex-start">
        <Image source={homeIcons[imageName]} style={IconStyleOption} />
        <Fonts padV="6%" lineHeight="medium">
          {text}
        </Fonts>
      </Section>
    </TouchableOpacity>
  );
};
export const EmptyRefriger = () => {
  return (
    <EmptyRefrigerWrap padV={`${4 * vh}px`}>
      <CenterTouchOpacity goal="refrigerator">
        <Image
          source={require('../../assets/icons/emptyRefriger.png')}
          style={ImageStyleOption}
        />
        <Fonts size="large" padV="0px">
          냉장고가 비어있어요.
        </Fonts>
        <Fonts color="tableBlack" padV="5px">
          지금 냉장고에 뭐가 들어있나요?
        </Fonts>
      </CenterTouchOpacity>
    </EmptyRefrigerWrap>
  );
};

const ExistRefirger = () => {
  const recipeCount = useRecipeCount();
  const navigation = useNavigation();
  const handleNavigation = (goal: string) => navigation.jumpTo(goal);

  return (
    <>
      <OrangeContainer row justify="flex-start">
        <TouchIconAndText
          imageName="homeIcon1"
          text={'냉장고\n관리'}
          onPress={() => handleNavigation('내 냉장고')}
          flexNumber={1}
        />
        <Divider />
        <TouchIconAndText
          flexNumber={2}
          imageName="homeIcon2"
          onPress={() => handleNavigation('추천레시피')}
          text={`${recipeCount} 개의 레시피를\n만들 수 있어요!`}
        />
      </OrangeContainer>
      <OrangeContainer justify="flex-start" row>
        <TouchIconAndText
          flexNumber={1}
          imageName="homeIcon3"
          onPress={() => handleNavigation('내 냉장고')}
          text={'이 재료로 어떤 음식을 만들 수 있을까?'}
        />
      </OrangeContainer>
    </>
  );
};

export default function MyRefriger({ empty }: { empty: boolean }) {
  return (
    <Container empty={empty}>
      {empty ? <EmptyRefriger /> : <ExistRefirger />}
    </Container>
  );
}
const Container: any = styled(Section)`
  /* height: 200px; */
  height: ${23 * vh}px;
  margin-bottom: ${3 * vh}px;
  /* ${(props: any) =>
    props.empty &&
    css`
      border-bottom-color: ${props.theme.color.tableGray};
      border-bottom-width: 1px;
    `} */
`;
const Divider = styled.View`
  width: 1px;
  height: ${7 * vh}px;
  background: ${({ theme }) => theme.color.black + '22'};
  margin-left: ${3 * vw}px;
  margin-right: ${1 * vw}px;
`;
const OrangeContainer = styled(Section)`
  border-color: ${({ theme }) => theme.color.carrot + '77'};
  border-radius: 16px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.color.carrot + '22'};
  margin: 10px 0;
  flex: 1;
`;

const EmptyRefrigerWrap = styled(Divs)`
  ${(props: any) =>
    css`
      border-bottom-color: ${props.theme.color.tableGray};
      border-bottom-width: 1px;
    `}
  height: ${23 * vh}px;
`;

const ImageStyleOption: ImageStyle = {
  width: 10 * vw,
  height: 8 * vh,
  resizeMode: 'contain',
  top: -1 * vh,
};
const IconStyleOption: ImageStyle = {
  width: 8 * vw,
  height: 5.5 * vh,
  resizeMode: 'contain',
  marginRight: 3 * vw,
  marginLeft: 4 * vw,
};

interface TouchIconTextProps {
  flexNumber: number;
  imageName: string;
  text: string;
  onPress: () => void;
}
