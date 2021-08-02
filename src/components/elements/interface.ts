import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import {Colors, Sizes} from 'styled-components';

export interface DivsProps {
  padV?: string;
  padH?: string;
  marginV?: string;
  marginH?: string;
  children?: React.ReactNode;
}

export interface LinkButtonsProps {
  title?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width: string;
  height: string;
  margin?: string;
}
export interface ImageButtonProps {
  uri: string;
  width?: string;
  height?: string;
  marginV?: string;
  marginH?: string;
  children?: React.ReactNode;
}
export interface ActionButtonProps {
  onPress(ev: NativeSyntheticEvent<NativeTouchEvent>): void;
  padV?: string;
  padH?: string;
  marginV?: string;
  marginH?: string;
  children?: React.ReactNode;
}
export interface ImageButtonStyleProps {
  width?: string;
  height?: string;
  marginV?: string;
  marginH?: string;
}
export interface SelectButtonProps extends ActionButtonProps {
  color: string;
  border: string;
  size?: Sizes;
}
export interface SelectButtonStyleProps {
  select?: boolean;
  color?: string;
  border?: string;
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
  handleSubmit: any;
  goal: string;
  marginV?: string;
  marginH?: string;
  padV?: string;
  padH?: string;
}

export interface FormPhotoProps {
  control: any;
  formName: string;
}

export interface FormInputProps extends FormPhotoProps {
  placeholder: string;
}
