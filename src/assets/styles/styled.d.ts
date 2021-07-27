import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import 'styled-components';

//DefaultTheme 타입 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
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
      main: string;
    };
    text: {
      [key: string]: string;
      xlarge: string;
      large: string;
      medium: string;
      small: string;
    };
  }
  export interface SectionProps {
    flexNumber: number;
    className?: string;
    background?: string;
    row?: boolean;
    paddings?: string;
    margins?: string;
    justify?:
      | 'flex-start'
      | 'center'
      | 'flex-end'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
  }

  export interface FontProps {
    [key: string]: string;
    size: 'xlarge' | 'large' | 'medium' | 'small';
  }

  export interface ButtonsProps {
    title?: string;
    onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    width: string;
    height: string;
    margin?: string;
  }
}
