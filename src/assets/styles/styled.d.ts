import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import 'styled-components/native';

//DefaultTheme 타입 정의
declare module 'styled-components' {
  export type Sort =
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  export interface DefaultTheme {
    // [key: string]: string;

    color: {
      [key: string]: string;
      black: string;
      tableBlack: string;
      tableGray: string;
      light: string;
      bgColor: string;
      carrot: string;
      vegetable: string;
      citrus: string;
      white: string;
      deepOrange: string;
      deepGreen: string;
      deepYellow: string;
    };
    padding: {
      android: string;
      ios: string;
    };
    text: {
      [key: string]: string;
      xlarge: string;
      large: string;
      medium: string;
      small: string;
    };
    lineHeight: {
      [key: string]: string;
      xlarge: string;
      large: string;
      medium: string;
      small: string;
    };
    vw: number;
    vh: number;
  }
  export interface SectionProps {
    flexNumber?: number | string;
    className?: string;
    background?: string;
    row?: boolean;
    paddings?: string;
    margins?: string;
    justify?: Sort;
    align?: Sort;
  }

  export type Colors =
    | 'black'
    | 'tableBlack'
    | 'tableGray'
    | 'light'
    | 'bgColor'
    | 'carrot'
    | 'vegetable'
    | 'citrus'
    | 'white'
    | 'deepOrange'
    | 'deepGreen'
    | 'deepYellow';
  export type Sizes = 'xlarge' | 'large' | 'medium' | 'small';

  export interface FontProps {
    size: Sizes;
    fontColor: Colors;
    lineHeight: Sizes | 'none';
    bold: boolean;
  }

  export interface ButtonsProps {
    title?: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    width: string;
    height: string;
    margin?: string;
  }
}
