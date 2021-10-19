import React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  TextInputSubmitEditingEventData,
  ViewStyle,
} from 'react-native';
import { Colors, Sizes } from 'styled-components';

export interface DivsProps {
  padV?: string;
  padH?: string;
  marginV?: string;
  marginH?: string;
  width?: string;
  height?: string;
  children?: React.ReactNode;
}

export interface LinkButtonsProps {
  title?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width: string;
  height: string;
  margin?: string;
}
export interface ImageButtonProps extends ImageButtonStyleProps {
  uri?: string;
  onPress: (ev?: NativeSyntheticEvent<NativeTouchEvent>) => void;
  children?: React.ReactNode;
}
export interface ImageButtonStyleProps {
  width?: string;
  height?: string;
  radius?: number;
  color?: Colors;
  marginV?: string;
  marginH?: string;
}
export interface ActionButtonProps {
  onPress?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width?: string;
  height?: string;
  marginV?: string;
  marginH?: string;
  radius?: number;
  children?: React.ReactNode;
}
export interface SelectButtonProps extends ActionButtonProps {
  color?: Colors;
  border?: Colors;
  size?: Sizes;
}

export interface IngredientButtonProps {
  onPress?: Function;
  children: string;
  isPick?: boolean;
  color?: Colors;
  chip?: boolean;
  init?: boolean;
  category: MainCategory;
}

export interface SelectButtonStyleProps {
  width?: string;
  height?: string;
  radius?: number;
  select?: boolean;
  color?: Colors;
  border?: Colors;
}

export interface ChipButtonProps extends ActionButtonProps {
  color?: Colors;
  size?: Sizes;
}

export interface FontsProps {
  children?: React.ReactNode;
  center?: boolean;
  size?: Sizes;
  lineHeight?: Sizes | 'none';
  padH?: string;
  padV?: string;
  color?: Colors;
  bold?: boolean;
}
export interface TextStyleProps {
  center?: boolean;
  size?: Sizes;
  lineHeight?: Sizes | 'none';
  fontColor?: Colors;
  bold?: boolean;
  children?: React.ReactNode;
}

export interface FormProps {
  formName: string;
  children(param: any): React.ReactElement;
}
export interface NextSubmitProps {
  goal: string;
  check?: boolean;
  marginV?: string;
  marginH?: string;
  padV?: string;
  padH?: string;
}

export interface FormElementProps<T = ViewStyle> {
  formName: string;
  placeholder?: string;
  style?: StyleProp<T>;
  children?: React.ReactElement | React.ReactElement[] | string;
}

export interface ImageStyleProps {
  Width?: string;
  width?: string;
  Height?: string;
  height?: string;
  color?: Colors;
}

export interface InputStyleProps {
  width?: string;
  placeholder?: string;
  icon?: boolean;
  fontSize?: Sizes;
  color?: Colors;
  onEndEditing(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void;
}

export type InputEvent = NativeSyntheticEvent<TextInputSubmitEditingEventData>;

export type SearchInputProps = Omit<InputStyleProps, 'onEndEditing'> & {
  onChangeText(text: string): void;
};
export interface SearchResultProps {
  results: string[];
}
