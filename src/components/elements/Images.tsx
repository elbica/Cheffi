import React from 'react';
import { Image, ImageStyle } from 'react-native';
import styled from 'styled-components/native';
import { Section, theme, vh, vw } from '../../assets/styles/theme';
import { ImageStyleProps } from './interface';

export function FryPan() {
  return (
    <Section justify="flex-end" align="flex-end">
      <Image
        source={require('../../assets/images/FryPan.png')}
        style={{ width: 70 * vw, height: 27 * vh }}
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
        style={{ width: 40 * vw, height: 15 * vh }}
        resizeMode="contain"
      />
    </Section>
  );
}
export function Star() {
  return (
    <StarContainer
      source={require('../../assets/icons/star.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function Scrap() {
  return (
    <ScrapContainer
      source={require('../../assets/icons/star.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function Time() {
  return (
    <ScrapContainer
      source={require('../../assets/icons/time.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function Calories() {
  return (
    <StarContainer
      source={require('../../assets/icons/calories.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function Clock() {
  return (
    <StarContainer
      source={require('../../assets/icons/clock.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function EmptyStar() {
  return (
    <EmptyStarContainer
      source={require('../../assets/icons/emptyStar.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
  );
}
export function Review() {
  return (
    <ScrapContainer
      source={require('../../assets/icons/review.png')}
      // style={{width: 40 * vw, height: 15 * vh}}
      resizeMode="contain"
    />
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
export function Check({ color }: ImageStyleProps) {
  return (
    <CheckContainer
      source={require('../../assets/icons/check.png')}
      color={color}
    />
  );
}
export function Search({ width, height, color }: ImageStyleProps) {
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
  width: ${({ Width }) => Width || '100%'};
  height: ${({ Height }) => Height || '100%'};
  tint-color: ${({ color }) => theme.color[color || 'black']};
`;
const CheckContainer = styled.Image<ImageStyleProps>`
  width: 70%;
  height: 60%;
  tint-color: ${({ color }) => theme.color[color || 'black']};
`;
const StarContainer = styled.Image<ImageStyleProps>`
  /* justify-items: flex-end; */
  margin-right: 8px;
  width: 18px;
  height: 18px;
`;
const EmptyStarContainer = styled(StarContainer)`
  tint-color: ${({ color }) => theme.color[color || 'tableBlack']};
`;

const ScrapContainer = styled.Image`
  width: 40px;
  height: 40px;
`;
