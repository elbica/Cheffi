import React from 'react';
import {Image, ImageStyle} from 'react-native';
import styled, {css} from 'styled-components/native';
import {homeIcons} from '../../assets/icons/icons';
import {Section, vh, vw} from '../../assets/styles/theme';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import {CenterTouchOpacity, LeftTouchOpacity} from '../layout/PageMoveLayout';

const TouchIconAndText = ({
  flexNumber,
  imageName,
  text,
}: {
  flexNumber: number;
  imageName: string;
  text: string;
}) => {
  return (
    <LeftTouchOpacity goal="refrigerator">
      <Section row flexNumber={flexNumber} justify="flex-start">
        <Image source={homeIcons[imageName]} style={IconStyleOption} />
        <Fonts padV="6%" lineHeight="medium">
          {text}
        </Fonts>
      </Section>
    </LeftTouchOpacity>
  );
};
const EmptyRefriger = () => {
  return (
    <Divs padV="8%">
      <CenterTouchOpacity goal="refrigerator">
        <Image
          source={require('../../assets/icons/emptyRefriger.png')}
          style={ImageStyleOption}
        />
        <Fonts size="large" padV="0%">
          냉장고가 비어있어요.
        </Fonts>
        <Fonts color="tableBlack" padV="1%">
          지금 냉장고에 뭐가 들어있나요?
        </Fonts>
      </CenterTouchOpacity>
    </Divs>
  );
};

export default function MyRefriger({empty}) {
  return (
    <Container empty={empty}>
      {empty ? (
        <EmptyRefriger />
      ) : (
        <>
          <OrangeContainer row justify="flex-start">
            <TouchIconAndText
              imageName="homeIcon1"
              text={'냉장고\n관리'}
              flexNumber={1}
            />
            <Divider />
            <TouchIconAndText
              flexNumber={2}
              imageName="homeIcon2"
              text={'100개의 레시피를\n만들 수 있어요!'}
            />
          </OrangeContainer>
          <OrangeContainer justify="flex-start" row>
            <TouchIconAndText
              flexNumber={1}
              imageName="homeIcon3"
              text={'이 재료로 어떤 음식을 만들 수 있을까?'}
            />
          </OrangeContainer>
        </>
      )}
    </Container>
  );
}
const Container: any = styled(Section)`
  /* height: 200px; */
  flex: 2;
  margin-bottom: ${3 * vh}px;
  ${(props: any) =>
    props.empty &&
    css`
      border-bottom-color: ${props.theme.color.tableGray};
      border-bottom-width: 1px;
      flex: 0.6;
    `}
`;
const Divider = styled.View`
  width: 1px;
  height: ${7 * vh}px;
  background: ${({theme}) => theme.color.black + '22'};
  margin-left: ${3 * vw}px;
  margin-right: ${1 * vw}px;
`;
const OrangeContainer = styled(Section)`
  border-color: ${({theme}) => theme.color.carrot + '77'};
  border-radius: 16px;
  border-width: 1px;
  background-color: ${({theme}) => theme.color.carrot + '22'};
  margin: 2.2% 0;
  flex: 1;
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
