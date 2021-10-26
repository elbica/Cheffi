import { Dimensions, Platform } from 'react-native';
import {
  ButtonsProps,
  DefaultTheme,
  FontProps,
  SectionProps,
} from 'styled-components';
import styled from 'styled-components/native';

export const vw = Dimensions.get('window').width / 100;
export const vh = Dimensions.get('window').height / 100;
export const isAndroid = Platform.OS === 'android';
//자주 쓰는 스타일들 정의
export const theme: DefaultTheme = {
  color: {
    black: '#231b16',
    tableBlack: '#695f57',
    tableGray: '#b1a396',
    light: '#f5f3e8',
    bgColor: '#fff8f2',
    carrot: '#ff9140',
    vegetable: '#11f0a3',
    citrus: '#ffe839',
    white: '#ffffff',
    deepOrange: '#e78034',
    deepGreen: '#83ba9e',
    deepYellow: '#fae01e',
  },
  padding: {
    android: `${12.5 * vh}px 5% 66px 5%`,
    ios: `${13 * vh}px 5% 95px 5%`,
  },
  text: {
    xlarge: '24px',
    large: '20px',
    mediumLarge: '18px',
    medium: '16px',
    small: '13px',
  },
  lineHeight: {
    xlarge: '32px',
    large: '27px',
    mediumLarge: '24px',
    medium: '22px',
    small: '16px',
    none: '0',
  },
  vw: vw,
  vh: vh,
};
export const AppWrap = styled.View`
  padding: ${Platform.OS === 'android'
    ? theme.padding.android
    : theme.padding.ios};
  width: 100%;
  flex: 1;
  height: 100%;
  background-color: white;
  position: relative;
`;
export const Section = styled.View`
  flex: ${(props: SectionProps) => props.flexNumber};
  background-color: ${(props: SectionProps) => props.background};
  flex-direction: ${(props: SectionProps) => (props.row ? 'row' : 'column')};
  /* flex-wrap: wrap; */
  padding: ${(props: SectionProps) => props.paddings};
  margin: ${(props: SectionProps) => props.margins};
  justify-content: ${(props: SectionProps) => props.justify};
  align-items: ${(props: SectionProps) => props.align};
  width: ${(props: SectionProps) => props.width || '100%'};
  height: ${(props: SectionProps) => props.height || '100%'};
`;
export const BackgroundSection = styled.View`
  flex: 1;
  background-color: ${theme.color.bgColor};
  padding-top: ${11 * vh}px;
`;

export const Font = styled.Text`
  font-size: ${(props: FontProps) => theme.text[props.size]};
  color: ${(props: FontProps) => theme.color[props.fontColor]};
  line-height: ${(props: FontProps) => theme.lineHeight[props.lineHeight]};
  font-weight: ${(props: FontProps) => (props.bold ? 'bold' : 'normal')};
`;

export const TouchButton = styled.TouchableOpacity`
  width: ${(props: ButtonsProps) => props.width};
  height: ${(props: ButtonsProps) => props.height};
  background-color: red;
  justify-content: center;
  align-items: center;
  margin: ${(props: ButtonsProps) => (props.margin ? props.margin : 0)};
`;

/* Default props */
Section.defaultProps = {
  flexNumber: 1,
  background: 'transparent',
  row: false,
  paddings: '0',
  margins: '0',
  justify: 'center',
  align: 'center',
};
Font.defaultProps = {
  size: 'medium',
  fontColor: 'black',
  lineHeight: 'none',
};
