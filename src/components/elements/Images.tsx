import React from 'react';
import {Image, ImageStyle} from 'react-native';
import {Section, vh, vw} from '../../assets/styles/theme';

export function FryPan() {
  return (
    <Section justify="flex-end" align="flex-end">
      <Image
        source={require('../../assets/images/FryPan.png')}
        style={{width: 70 * vw, height: 26 * vh}}
        resizeMode="contain"
      />
    </Section>
  );
}
export function Hand() {
  return (
    <Section justify="flex-end" align="flex-end">
      <Image
        source={require('../../assets/images/Hand.png')}
        style={{width: 30 * vw, height: 15 * vh}}
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
