import React from 'react';
import {Image, ImageStyle} from 'react-native';
import styled from 'styled-components/native';
import {Section, theme, vh, vw} from '../../assets/styles/theme';
import {ImageStyleProps} from './interface';

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
export function Check({color}: ImageStyleProps) {
  return (
    <CheckContainer
      source={require('../../assets/icons/check.png')}
      color={color}
    />
  );
}
export function Search({width, height, color}: ImageStyleProps) {
  return (
    <ImageContainer
      source={require('../../assets/icons/search.png')}
      Width={width}
      Height={height}
      color={color}
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

const ImageContainer = styled.Image<ImageStyleProps & ImageStyle>`
  width: ${({Width}) => Width || '100%'};
  height: ${({Height}) => Height || '100%'};
  tint-color: ${({color}) => theme.color[color || 'black']};
`;
const CheckContainer = styled.Image<ImageStyleProps>`
  width: 70%;
  height: 60%;
  tint-color: ${({color}) => color};
`;
