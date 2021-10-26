import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageStyle, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { homeIcons } from '../../assets/icons/icons';
import { Section, vh, vw } from '../../assets/styles/theme';
import { useRecipeCount } from '../../hooks/useRedux';
import Fonts from '../elements/Fonts';

const TouchIconAndText = ({
  height,
  imageName,
  text,
  onPress,
}: TouchIconTextProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Section row justify="flex-start" height={height}>
        <Image source={homeIcons[imageName]} style={IconStyleOption} />
        <Fonts lineHeight="medium">{text}</Fonts>
      </Section>
    </TouchableOpacity>
  );
};
export const EmptyRefriger = () => {
  const navigation = useNavigation<RefrigerTabProp>();
  return (
    <EmptyRefrigerWrap>
      <Center onPress={() => navigation.jumpTo('내 냉장고')} activeOpacity={1}>
        <Image
          source={require('../../assets/icons/emptyRefriger.png')}
          style={ImageStyleOption}
        />
        <Fonts size="large" padV="0px" color="tableBlack">
          냉장고가 비어있어요.
        </Fonts>
        <Fonts padV="5px" color="tableGray">
          지금 냉장고에 뭐가 들어있나요?
        </Fonts>
      </Center>
    </EmptyRefrigerWrap>
  );
};

const ExistRefirger = () => {
  const recipeCount = useRecipeCount();
  const navigation = useNavigation<RefrigerTabProp>();
  const handleNavigation = (goal: keyof TabNavParamList) =>
    navigation.jumpTo(goal);

  return (
    <>
      <OrangeContainer>
        <TouchIconAndText
          imageName="homeIcon1"
          text={'냉장고\n관리'}
          onPress={() => handleNavigation('내 냉장고')}
          height="80px"
        />
        <Divider />
        <TouchIconAndText
          height="80px"
          imageName="homeIcon2"
          onPress={() => handleNavigation('추천레시피')}
          text={`${recipeCount} 개의 레시피를\n만들 수 있어요!`}
        />
      </OrangeContainer>
      <OrangeContainer height="200px">
        <TouchIconAndText
          height="60px"
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
const Container: any = styled.View`
  height: auto;
  margin-bottom: ${3 * vh}px;
`;
const Divider = styled.View`
  width: 1px;
  height: ${7 * vh}px;
  background: ${({ theme }) => theme.color.black + '22'};
  margin-left: ${3 * vw}px;
  margin-right: ${1 * vw}px;
`;
const OrangeContainer = styled.View<{ height?: string }>`
  border-color: ${({ theme }) => theme.color.carrot + '77'};
  border-radius: 16px;
  border-width: 1px;
  background-color: ${({ theme }) => theme.color.carrot + '22'};
  height: ${({ height }) => height || '200px'};
  margin: 20px 0 0px 0;
  flex-direction: row;
  height: auto;
  align-items: center;
  top: 3px;
`;

const EmptyRefrigerWrap = styled.View`
  ${(props: any) =>
    css`
      border-bottom-color: ${props.theme.color.tableGray};
      border-bottom-width: 1px;
    `}
  height: ${23 * vh}px;
  justify-content: center;
`;

const ImageStyleOption: ImageStyle = {
  width: 10 * vw,
  height: 8 * vh,
  resizeMode: 'contain',
  top: -1 * vh,
};
const IconStyleOption: ImageStyle = {
  width: 9 * vw,
  height: 5 * vh,
  resizeMode: 'contain',
  marginRight: 3 * vw,
  marginLeft: 4 * vw,
};

const Center = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
interface TouchIconTextProps {
  height: string;
  imageName: string;
  text: string;
  onPress: () => void;
}
