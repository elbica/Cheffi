import React from 'react';
import {Image, ImageStyle} from 'react-native';
import styled from 'styled-components/native';
import {Section, vh, vw} from '../../assets/styles/theme';

export function FryPan() {
  return (
    <Section justify="flex-end" align="flex-end">
      <Image
        source={require('../../assets/images/FryPan.png')}
        style={{width: 70 * vw, height: 27 * vh}}
        resizeMode="stretch"
      />
    </Section>
  );
}
export function Hand() {
  return (
    <Section justify="flex-end" align="flex-end">
      <Image
        source={require('../../assets/images/Hand.png')}
        style={{width: 40 * vw, height: 15 * vh}}
        resizeMode="contain"
      />
    </Section>
  );
}
export function NextArrow() {
  return (
    <Image
      source={require('../../assets/icons/nextArrow.png')}
      style={nextArrowStyle}
      resizeMode="contain"
    />
  );
}
export function PrevArrow() {
  return (
    <Image
      source={require('../../assets/icons/prevArrow.png')}
      style={prevArrowStyle}
    />
  );
}
export function Check({color}: {color: string}) {
  return (
    <ImageContainer
      source={require('../../assets/icons/check.png')}
      tintColor={color}
    />
  );
}

const prevArrowStyle: ImageStyle = {
  marginLeft: 24,
  width: 30,
  height: 28,
  resizeMode: 'contain',
  opacity: 0.8,
};
const nextArrowStyle: ImageStyle = {
  ...prevArrowStyle,
  marginLeft: 0,
};

const ImageContainer = styled.Image<ImageStyle>`
  width: 70%;
  height: 60%;
`;
